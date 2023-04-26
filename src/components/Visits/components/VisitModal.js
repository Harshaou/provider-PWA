import { Button, Input, Modal } from "antd";
import CloseModalImg from '../../../img/close-modal.png';
import avatar from '../../../img/avatar.png';
import { preventMinus } from "../../Common/HelperFunctions";
import { SearchOutlined, LoadingOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { resetMember, getMemberByCardNumber } from '../../../store/dashboardSlice';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VisitModal = ({ setIsModalVisible, isModalVisible }) => {
    const dispatch = useDispatch();
    const { member } = useSelector((state) => state.dashboard);
    const navigate = useNavigate()
    const [cardNumber, setCardNumber] = useState();
    const [wrongCardNumber, setWrongCardNumber] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false)
    const [otp, setOtp] = useState('')
    const handleModalClose = () => {
        setIsModalVisible(false)
        setCardNumber('');
        dispatch(resetMember());
        setWrongCardNumber('');
    };

    const handleSearch = () => {
        if (cardNumber && cardNumber.length === 11) {
            setWrongCardNumber(false);
            dispatch(getMemberByCardNumber(cardNumber));
        } else {
            setWrongCardNumber(true);
        }
    };

    const handleCardNumbChange = (e) => {
        setCardNumber(e.target.value);
        if (e.target.value === '') {
            dispatch(resetMember());
        }
    };

    const [msg, setMsg] = useState('')

    return (
        <Modal bodyStyle={{ padding: 50 }} footer={null} visible={isModalVisible}>

            <div onClick={handleModalClose} style={{ cursor: 'pointer' }} className="modalCloseIcon">
                <img src={CloseModalImg} style={{ width: 28 }} alt="" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                <div>
                    <h1 className="mbZero">Create Visit</h1>
                    <h5 className="mbZero">Fill in the form below to Create a new visit.</h5>
                </div>

                <div style={{ width: '65%' }}>
                    <h5 style={{ fontWeight: 700 }}>Member Number/NIDA Number</h5>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: 5,
                            alignItems: 'center',
                        }}
                    >
                        <Input
                            onPressEnter={handleSearch}
                            prefix={member.isSearchLoading ? <LoadingOutlined /> : <SearchOutlined />}
                            style={{ borderRadius: 15 }}
                            placeholder="Search Member Number"
                            type="number"
                            value={cardNumber}
                            onKeyPress={preventMinus}
                            allowClear
                            onChange={handleCardNumbChange}
                        />
                        <Button
                            disabled={cardNumber && cardNumber.length < 1}
                            onClick={handleSearch}
                            size="medium"
                            type="primary"
                            shape="round"
                        >
                            Go
                        </Button>
                    </div>
                    {wrongCardNumber && (
                        <p style={{ marginBottom: 0, marginTop: 5, color: 'red', fontSize: 12 }}>
                            Card number must be 11 digit
                        </p>
                    )}
                </div>

                {member.isSearchLoaded &&
                    (member.data ? (
                        <div style={{ display: 'flex', }}>
                            <div style={{ display: 'flex', gap: 15, marginBottom: 15 }}>
                                <img
                                    style={{ width: 75, height: 75, borderRadius: '50%' }}
                                    src={
                                        member.data?.files?.profile_pic?.url
                                            ? member.data.files.profile_pic?.url
                                            : avatar
                                    }
                                    alt=""
                                />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <h5 style={{ fontWeight: 700, fontSize: 14 }} className="mbZero">
                                        {member.data.name}
                                    </h5>
                                    <p style={{ color: '#f87d4e', fontSize: 12 }}>#{member.data.member_number}</p>
                                    <p style={{ fontSize: 12, marginTop: '-10px' }}><MailOutlined /> {member.data.email}</p>
                                    <p style={{ fontSize: 12, marginTop: '-10px' }}><PhoneOutlined style={{ transform: 'rotate(90deg)' }} /> {member.data.contact_number}</p>

                                    <div style={{ borderBottom: '0.25px solid #c3c3c3', width: '100%', margin: '15px 0px' }} ></div>
                                    <h4>Enter OTP recieved on patient&apos;s number</h4>
                                    <Input type="number" placeholder="Enter OTP" style={{ borderRadius: 15, height: '36px', width: '50%' }} allowClear value={otp} onChange={e => e.target.value.length < 7 ? setOtp(e.target.value) : null} />
                                    <span style={{ color: 'red' }}>{msg}</span>
                                    <Button
                                        disabled={!member.isSearchLoaded && otpVerified}
                                        onClick={() => {
                                            if (otp === '000000') { navigate(`/visits/request/${member.data.member_number}`, { state: { member: member.data } }) }
                                            else {
                                                setMsg('Incorrect OTP')
                                            }
                                        }
                                        }
                                        size="large"
                                        style={{ width: '75%', marginTop: '20px' }}
                                        type="primary"
                                        shape="round"
                                        htmlType="submit"
                                    >
                                        Verify OTP
                                    </Button>
                                </div>
                            </div>

                        </div>
                    ) : (
                        <p style={{ color: 'red', marginLeft: 10, marginBottom: 0, marginTop: '-15px' }}>
                            No Member found
                        </p>
                    ))}


            </div>

        </Modal >
    )
}

export default VisitModal;