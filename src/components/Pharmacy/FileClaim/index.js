import { Button, Form, Input, InputNumber, notification, Popover, Select, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Main from '../../../template';
import { InboxOutlined } from '@ant-design/icons';
import styles from './index.module.css'
import { baseUrl } from '../../../utils';
import BreadCrumbs from '../Dashboard/components/BreadCrumbs';

const FileClaim = () => {

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { state } = useLocation();
    const [visit, setVisit] = useState();
    const [memberBenefits, setMemberBenefits] = useState()
    useEffect(() => {
        setVisit({
            attending_doctor_name: state?.data?.attending_doctor_name,
            attending_doctor_specialisation: state?.data?.attending_doctor_specialisation,
            provider_address: state?.data?.provider_address,
            provider_name: state?.data?.provider_name,
            member_number: state?.data?.member?.member_number,
            patient_name: state?.data?.member?.name,
            visit_id: state?.data?.visit_id
        }, setMemberBenefits(state?.data?.member_benefit_balance))
    }, [state])

    const [totalAmount, setTotalAmount] = useState(0)
    const [claimAmount, setClaimAmount] = useState(0)
    const [copayAmount, setCopayAmount] = useState(0)
    const [prescription, setPrescription] = useState(null)
    const [invoice, setInvoice] = useState()
    const [currency, setCurrency] = useState({ label: 'Rwf', value: 'Rwf' })

    const navigate = useNavigate();

    const fileClaim = async () => {
        setLoading(true)
        const data = new FormData();
        data.append('request', JSON.stringify({ total_amount: totalAmount, claim_amount: claimAmount, copay_amount: copayAmount, currency: currency.value }))
        data.append('prescription', prescription)
        data.append('pharmacy_invoice', invoice)
        await fetch(`${baseUrl}/pharmacy/claim/visit/${visit.visit_id}`, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('x-auth-token')}`,
            },
            body: data

        }).then(res => res.json())
            .then(res => {
                if (res?.api?.responseCode === 2010) {
                    notification.open({
                        message: 'Claim #' + res?.result?.claim_id + ' Raised',
                        description:
                            'Successfully raised claim',
                    });
                    navigate('/claims')
                }
                else {
                    setError(res?.message)
                }
            }).catch(e => console.log(e))
            .finally(() => setLoading(false))
    }
    const { Dragger } = Upload;
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    return (<Main>
        <BreadCrumbs BreadCrumbsItems={[{ label: 'Dashboard', link: '/' }, { label: 'File Manual Claim', link: '/', state: { openVisitModal: true } }, { label: 'Visit #' + visit?.visit_id }]} />
        <div style={{ display: 'flex', gap: '20px', marginTop: '15px', flexDirection: 'column', width: '100%' }}>


            <div style={{ display: 'flex', gap: '20px', width: '100%' }}>

                <div
                    className={styles.cardShadow}
                    style={{ width: '75%', padding: '25px', paddingBottom: '10px' }}
                >
                    <p className={styles.cardTitle} style={{ marginTop: '0px' }}>Visit Details</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '0px', columnGap: '25px', width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '0px' }}>
                            <p className={styles.cardLabel} >Patient Name</p>
                            <p className={styles.cardValue}>{visit?.patient_name}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-5px' }}>
                            <p className={styles.cardLabel} >Member Number</p>
                            <p className={styles.cardValue}>{visit?.member_number}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-5px' }}>
                            <p className={styles.cardLabel} >Provider</p>
                            <p className={styles.cardValue}>{visit?.provider_name}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-5px' }}>
                            <p className={styles.cardLabel} >Provider Address</p>
                            <p className={styles.cardValue}>{visit?.provider_address}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-5px' }}>
                            <p className={styles.cardLabel} >Attending Doctor</p>
                            <p className={styles.cardValue}>{visit?.attending_doctor_name || '--'}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-5px' }}>
                            <p className={styles.cardLabel} >Doctor Specialization</p>
                            <p className={styles.cardValue}>{visit?.attending_doctor_specialisation || '--'}</p>
                        </div>
                    </div>
                </div>
                <div
                    className={styles.cardShadow}
                    style={{ width: '100%', padding: '25px', paddingBottom: '10px' }}
                >
                    <p className={styles.cardTitle} style={{ marginTop: '0px' }}>Available Benefits</p>
                    <Popover placement="left" content={
                        <div style={{ height: '50px' }}>
                            <p style={{ marginTop: '-10px' }}>Start Date: <span style={{ fontWeight: '600' }}>{memberBenefits?.policy_start_date}</span></p>
                            <p style={{ marginTop: '-10px' }}>End Date: <span style={{ fontWeight: '600' }}>{memberBenefits?.policy_start_date}</span></p>
                        </div>
                    } title="Policy">
                        <div style={{ cursor: 'default', position: 'absolute', top: '15px', right: '15px', backgroundColor: '#3ab44d', color: 'white', borderRadius: '12px', padding: '5px 15px', fontSize: '16px', fontWeight: '500' }}>{memberBenefits?.benefit_name}</div>
                    </Popover>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '0px', columnGap: '25px' }} >
                        {memberBenefits?.benefit_category.slice(0, memberBenefits?.benefit_category.length - 1).map((benefit, i) =>
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', marginTop: '-5px' }}>
                                <p className={styles.cardLabel} style={{ fontWeight: '500', fontSize: '16px', opacity: '65%' }} >
                                    {benefit?.category}
                                    {benefit?.cover_types?.map((cover_type, i) =>
                                        <span key={i} style={{ border: '1.5px solid rgb(254, 200, 40)', fontWeight: '600', borderRadius: '12px', padding: '0px 10px', margin: '3px', fontSize: '14px', color: 'rgb(254, 200, 40)', marginLeft: (i === 0 ? '15px' : '3px') }}>
                                            {cover_type}
                                        </span>
                                    )}


                                </p>
                                <p className={styles.cardValue} style={{ marginTop: '-15px' }}><span style={{ color: '#3ab44d', fontWeight: '600' }}>{benefit?.balance_left?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} RWF</span> <span style={{ opacity: '75%' }}>/ {benefit?.allocation?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} RWF</span></p>
                            </div>)}


                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-5px', width: '100%' }}>
                        <p className={styles.cardLabel} style={{ fontWeight: '500', fontSize: '16px', opacity: '65%' }} >
                            {memberBenefits?.benefit_category[memberBenefits?.benefit_category.length - 1]?.category}
                            {memberBenefits?.benefit_category[memberBenefits?.benefit_category.length - 1]?.cover_types?.map((cover_type, i) =>
                                <span key={i} style={{ border: '1.5px solid rgb(254, 200, 40)', fontWeight: '600', borderRadius: '12px', padding: '0px 10px', margin: '3px', fontSize: '14px', color: 'rgb(254, 200, 40)', marginLeft: (i === 0 ? '15px' : '3px') }}>
                                    {cover_type}
                                </span>
                            )}


                        </p>
                        <p className={styles.cardValue} style={{ marginTop: '-15px' }}><span style={{ color: '#3ab44d', fontWeight: '600' }}>{memberBenefits?.benefit_category[memberBenefits?.benefit_category.length - 1]?.balance_left?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} RWF</span> <span style={{ opacity: '75%' }}>/ {memberBenefits?.benefit_category[memberBenefits?.benefit_category.length - 1]?.allocation?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} RWF</span></p>
                    </div>
                </div>
            </div>
            <div
                className={styles.cardShadow}
                style={{ width: '100%', }}
            >
                <p className={styles.cardTitle} style={{ margin: '10px 25px', marginTop: '0px' }}>Claim Details</p>
                <Form>
                    {/*  {"claim_amount": 16500, "copay_amount": 1750, "total_amount": 15750, "currency": "Rwf"} */}
                    <div style={{
                        display: 'flex', flexDirection: 'row', gap: '15px', marginTop: '35px', padding: '0px 30px', width: '95%',
                        justifyContent: 'space-between',
                        marginBottom: error === '' ? '70px' : '85px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <p className={styles.cardValue}>Currency</p>
                            <Form.Item
                                rules={[
                                    { required: true, message: 'Select Currency' },
                                ]}
                                initialValue={{ value: 'Rwf', label: 'Rwf' }}
                                name={'currency'}
                                style={{ marginTop: '-25px' }} >
                                <Select
                                    onChange={setCurrency}
                                    id='currencySelect'
                                    className={styles.input}
                                    style={{ width: '85px', height: '36px' }}
                                    // defaultValue={currency}
                                    value={currency}
                                    options={[{ label: 'Rwf', value: 'Rwf' }, { label: 'Ksh', value: 'Ksh' }]}
                                />
                            </Form.Item>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <p className={styles.cardValue}>Total Amount</p>
                            <Form.Item
                                rules={[
                                    { type: 'number', min: 1, message: 'Enter Valid Total Amount' },
                                ]}
                                name={'total_amount'}
                                style={{ marginTop: '-25px', height: '36px' }} >
                                <InputNumber
                                    onChange={e => setTotalAmount(e)}
                                    precision={2}
                                    prefix={<p style={{ opacity: '50%', marginTop: '0px', marginBottom: '0px', fontWeight: '600' }}>{currency.value || currency}</p>}
                                    controls={false}
                                    className={styles.input}
                                    type='number'
                                />
                            </Form.Item>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <p className={styles.cardValue}>Co-Pay Amount</p>
                            <Form.Item
                                rules={[
                                    { type: 'number', min: 1, message: 'Enter Valid Co-Pay Amount' },
                                ]}
                                name={'copay_amount'}
                                style={{ marginTop: '-25px', height: '36px' }} >
                                <InputNumber
                                    onChange={e => setCopayAmount(e)}
                                    precision={2}
                                    prefix={<p style={{ opacity: '50%', marginTop: '0px', marginBottom: '0px', fontWeight: '600' }}>{currency.value || currency}</p>}
                                    controls={false}
                                    className={styles.input}
                                    type='number'
                                />
                            </Form.Item>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <p className={styles.cardValue}>Claim Amount</p>
                            <Form.Item
                                rules={[
                                    { type: 'number', min: 1, message: 'Enter Valid Claim Amount' },
                                ]}
                                name={'claim_amount'}
                                style={{ marginTop: '-25px', height: '36px' }} >
                                <InputNumber
                                    onChange={e => setClaimAmount(e)}
                                    precision={2}
                                    prefix={<p style={{ opacity: '50%', marginTop: '0px', marginBottom: '0px', fontWeight: '600' }}>{currency.value || currency}</p>}
                                    controls={false}
                                    className={styles.input}
                                    type='number'
                                />
                            </Form.Item>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <p className={styles.cardValue}>Prescription</p>
                            <Dragger
                                action={dummyRequest}
                                id='dragger'
                                multiple={false}
                                maxCount={1}
                                onChange={e => setPrescription(e.file.originFileObj)}
                                style={{ width: '125px', maxHeight: '120px', marginTop: '-20px' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 10px' }}>
                                    <p className="ant-upload-drag-icon" style={{ marginTop: '-12px' }}>
                                        <InboxOutlined style={{ fontSize: '26px' }} />
                                    </p>
                                    <p lassName={styles.cardValue} style={{ marginTop: '-10px', marginBottom: '10px' }}>Select File</p>
                                </div>
                            </Dragger>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <p className={styles.cardValue}>Invoice</p>
                            <Dragger
                                action={dummyRequest}
                                id='dragger'
                                multiple={false}
                                maxCount={1}
                                onChange={e => setInvoice(e.file.originFileObj)}
                                style={{ width: '125px', maxHeight: '120px', marginTop: '-20px', display: 'flex' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 10px' }}>
                                    <p className="ant-upload-drag-icon" style={{ marginTop: '-12px' }}>
                                        <InboxOutlined style={{ fontSize: '26px' }} />
                                    </p>
                                    <p lassName={styles.cardValue} style={{ marginTop: '-10px', marginBottom: '10px' }}>Select File</p>
                                </div>
                            </Dragger>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex', flexDirection: 'column', position: 'absolute',
                        right: '35px',
                        bottom: '25px',
                    }}>
                        {error && (
                            <div
                                style={{ color: 'red', fontSize: 14, textAlign: 'center', margin: '12px', width: '500px', textAlignLast: 'right' }}
                            >
                                {error?.replaceAll('_', ' ')}
                            </div>
                        )}
                        <Button
                            loading={loading}
                            type='primary'
                            // htmlType='submit'
                            onClick={() => fileClaim()}
                            className={styles.button}
                            style={{ width: '145px' }}
                        >File Claim</Button>
                    </div>
                </Form>
            </div>
        </div >
    </Main >)
}

export default FileClaim;