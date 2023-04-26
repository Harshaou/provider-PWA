import { Button, notification, Popover, Table } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.module.css'
import { InfoCircleOutlined } from '@ant-design/icons';
import { baseUrl } from '../../../utils';
import { useNavigate } from 'react-router-dom';
const Receipt = ({ receipt }) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const fileClaim = async () => {
        setLoading(true)
        await fetch(`${baseUrl}/pharmacy/claim/${receipt.claim_queue_token}`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${localStorage.getItem('x-auth-token')}`,
            }
        }).then(res => res.json())
            .then(res => {
                if (res?.api?.responseCode === 2010) {
                    notification.open({
                        message: 'Claim #' + res?.result?.claim_id + ' Raised',
                        description:
                            'Successfully raised claim for Prescription',
                    });
                    navigate('/claims')
                }
            })
            .catch(e => console.log(e))
            .finally(() => setLoading(false))
    }

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <div
                className={styles.cardShadow}
                style={{ width: '100%', marginTop: '15px', paddingBottom: '10px' }}
            >
                <p className={styles.cardTitle} style={{ marginTop: '0px', padding: '25px', paddingTop: '0px' }}>Prescription Receipt</p>
                <Table
                    pagination={false}
                    style={{ marginTop: '-25px', marginBottom: '5px', padding: '0px 10px' }}
                    dataSource={receipt?.medicines}
                    columns={[
                        {
                            title: 'Drug Name',
                            dataIndex: 'drug_name',
                            render: e => <p className={styles.tableValue}>{e}</p>
                        },
                        {
                            title: 'Drug Code',
                            dataIndex: 'drug_code',
                            render: e => <p className={styles.tableValue}>{e}</p>
                        },
                        {
                            title: 'Quantity Dispersed',
                            dataIndex: '',
                            width: '10%',
                            render: e => <p className={styles.tableValue}>{e.quantity_dispensed}</p>
                        },
                        {
                            title: 'Unit Price',
                            dataIndex: '',
                            render: e => <p className={styles.tableValue}>{e.unit_price + ' ' + e.currency}</p>
                        },
                        {
                            title: 'Amount',
                            dataIndex: '',
                            render: e => <p className={styles.tableValue}>{e.total_price + ' ' + e.currency}</p>
                        }
                    ]}
                />
                <div
                    style={{ width: '100%', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', paddingRight: '50px', marginTop: '10px', marginBottom: '100px' }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '15px' }}>
                        <p className={styles.tableValue}>Total Price</p>
                        <p style={{ marginLeft: '15px', fontSize: '16px', fontWeight: '600' }}>{receipt.total_amount.toFixed(2) + ' ' + receipt.medicines[0].currency}</p>
                        <p className={styles.tableValue}>
                            <Popover content='Claim Amount to be covered under Eden Care Health Insurance.' >
                                <span style={{ marginRight: '10px', fontSize: '18px', fontWeight: '600', lineHeight: '14px' }}><InfoCircleOutlined /></span>
                            </Popover>
                            Claim Amount</p>
                        <p style={{ marginLeft: '15px', fontSize: '16px', fontWeight: '600' }}>- {receipt.claim_amount.toFixed(2) + ' ' + receipt.medicines[0].currency}</p>
                        <p className={styles.tableValue}>
                            <Popover content='Co-Pay Amount to be paid by the patient.' >
                                <span style={{ marginRight: '10px', fontSize: '18px', fontWeight: '600', lineHeight: '14px' }}><InfoCircleOutlined /></span>
                            </Popover>
                            Co-Pay Amount
                        </p>
                        <p style={{ marginLeft: '15px', fontSize: '16px', fontWeight: '600' }}>{receipt.copay_amount.toFixed(2) + ' ' + receipt.medicines[0].currency}</p>

                    </div>
                </div>
                <div style={{
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    position: 'absolute', bottom: '30px', right: '35px',
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
                        size='large'
                        type='primary'
                        style={{ borderRadius: '25px', width: '125px' }}
                        onClick={() => fileClaim()}
                    >File Claim</Button>
                </div>

            </div>
            <div
                className={styles.cardShadow}
                style={{ maxHeight: '335px', width: '60%', padding: '25px', marginTop: '15px', paddingBottom: '10px' }}
            >
                <p className={styles.cardTitle} style={{ marginTop: '0px' }}>Prescription Details</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '0px', columnGap: '25px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '0px' }}>
                        <p className={styles.cardLabel} >Patient Name</p>
                        <p className={styles.cardValue}>{receipt?.patient_name}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-5px' }}>
                        <p className={styles.cardLabel} >Member Number</p>
                        <p className={styles.cardValue}>{receipt?.member_number}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-5px' }}>
                        <p className={styles.cardLabel} >Provider</p>
                        <p className={styles.cardValue}>{receipt?.provider_name}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-5px' }}>
                        <p className={styles.cardLabel} >Provider Address</p>
                        <p className={styles.cardValue}>{receipt?.provider_address}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-5px' }}>
                        <p className={styles.cardLabel} >Attending Doctor</p>
                        <p className={styles.cardValue}>{receipt?.attending_doctor_name}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-5px' }}>
                        <p className={styles.cardLabel} >Doctor Specialization</p>
                        <p className={styles.cardValue}>{receipt?.attending_doctor_specialisation}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Receipt;