import { Button, Steps, Table } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Main from '../../../../template'
import { baseUrl } from '../../../../utils'
import { FileTextOutlined } from '@ant-design/icons';
import styles from './index.module.css'
import BreadCrumbs from '../../Dashboard/components/BreadCrumbs'

const ClaimDetails = () => {

    const { claim_id } = useParams()

    const [loading, setLoading] = useState(false)

    const [claim, setClaim] = useState()

    const [statusColor, setStatusColor] = useState('gray')

    useEffect(() => {
        if (claim_id) {
            (async () => {
                await fetch(`${baseUrl}/pharmacy/claims/${claim_id}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('x-auth-token')}`,
                    },
                }).then(res => res.json())
                    .then(res => {
                        console.log(res)
                        if (res?.api?.responseCode === 2040) {
                            setClaim(res?.result,
                                setStatusColor(res?.result?.status === 'Pending' ? 'skyblue' : (res?.result?.status === 'In_Progress' ? 'rgb(254, 200, 40)' : (res?.result?.status === 'Approved' ? '#3ab44d' : (res?.result?.status === 'Declined' ? '#f87d4e' : 'gray'))))
                            )
                        }
                        else {
                            console.log(res?.message)
                        }
                    }).catch(e => console.log(e))
                    .finally(() => setLoading(false))
            })()
        }
    }, [claim_id])
    return (
        <Main>
            <BreadCrumbs BreadCrumbsItems={[{ label: 'Dashboard', link: '/' }, { label: 'Claims', link: '/claims' }, { label: 'Claim #' + claim?.claim_id }]} />
            <div style={{ display: 'flex', gap: '20px', width: '100%', marginTop: '15px' }}>
                <div className={styles.cardShadow} style={{ width: '80%' }}>
                    <p className={styles.cardTitle} style={{ margin: '10px 25px', marginTop: '0px' }}>Claim #{claim?.claim_id}</p>
                    <div
                        style={{
                            backgroundColor: statusColor,
                            width: '100px',
                            padding: '10px 15px',
                            borderRadius: '14px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            top: '15px',
                            right: '15px'
                        }}
                    > <p className={styles.cardValue} style={{ color: 'white', margin: '0px' }}>{claim?.status?.replaceAll('_', ' ')}</p></div>
                    <div style={{ padding: '10px 25px', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

                        <p className={styles.cardLabel}>Claim ID</p>
                        <p className={styles.cardLabel}>Claim Amount</p>
                        <p className={styles.cardValue}>{claim?.claim_id}</p>
                        <p className={styles.cardValue}>{claim?.claim_amount + ' ' + claim?.currency}</p>
                        <p className={styles.cardLabel}>Patient Name</p>
                        <p className={styles.cardLabel}>Member Number</p>
                        <p className={styles.cardValue}>{claim?.patient_name}</p>
                        <p className={styles.cardValue}>{claim?.member_number}</p>
                        <p className={styles.cardLabel}>Visit ID</p>
                        <p className={styles.cardLabel}>Created Time</p>
                        <p className={styles.cardValue}>{claim?.visit_id}</p>
                        <p className={styles.cardValue}>{claim?.created_timestamp}</p>

                    </div>
                    {claim?.medicines_disbursed ? null :
                        <div style={{ padding: '10px 25px', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                            <p className={styles.cardLabel}>Prescription</p>
                            <p className={styles.cardLabel}>Invoice</p>
                            <Button
                                onClick={() => window.open(claim?.claim_document?.prescription?.url)}
                                style={{ marginTop: '-10px', width: '150px', borderRadius: '15px', display: 'flex', gap: '7px' }} size='large'
                            >
                                <p className={styles.cardValue} style={{ marginTop: '0px' }}>Prescription</p>
                                <FileTextOutlined style={{ marginTop: '5px', }} />
                            </Button>
                            <Button
                                onClick={() => window.open(claim?.claim_document?.invoice?.url)}
                                style={{ marginTop: '-10px', width: '115px', borderRadius: '15px', display: 'flex', gap: '7px' }} size='large'
                            >
                                <p className={styles.cardValue} style={{ marginTop: '0px' }}>Invoice</p>
                                <FileTextOutlined style={{ marginTop: '5px', }} />
                            </Button>
                        </div>}
                </div>
                <div className={styles.cardShadow} style={{ width: '100%' }}>
                    <p className={styles.cardTitle} style={{ margin: '10px 25px', marginTop: '0px' }}>Timeline</p>
                    <Steps
                        style={{ padding: '10px 25px' }}
                        progressDot
                        current={0}
                        direction="vertical"
                        items={
                            [
                                {
                                    title: <p className={styles.cardValue} style={{ margin: '0px', marginTop: '3px' }}>Pending</p>,
                                    description: <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <p>{claim?.status_timeline[0]?.remarks}</p>
                                        <p style={{ marginTop: '-12px' }}>{claim?.status_timeline[0]?.updated_timestamp}</p>
                                    </div>
                                },
                                {
                                    title: <p className={styles.cardValue} style={{ margin: '0px', marginTop: '3px' }}>In Progress</p>,
                                    description: <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <p>{claim?.status_timeline[1]?.remarks}</p>
                                        <p style={{ marginTop: '-12px' }}>{claim?.status_timeline[1]?.updated_timestamp}</p>
                                    </div>
                                },
                                {
                                    title: <p className={styles.cardValue} style={{ margin: '0px', marginTop: '3px' }}>{claim?.status_timeline[2]?.status || 'Resolved'}</p>,
                                    description: <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <p>{claim?.status_timeline[2]?.remarks}</p>
                                        <p style={{ marginTop: '-12px' }}>{claim?.status_timeline[2]?.updated_timestamp}</p>
                                    </div>
                                }
                            ]}
                    />
                </div>
            </div>
            {claim?.medicines_disbursed ? <div className={styles.cardShadow} style={{ width: '100%', marginTop: '20px' }}>
                <p className={styles.cardTitle} style={{ margin: '10px 25px', marginTop: '0px' }}>Medicines Disbursed</p>
                <Table
                    style={{ width: '100%', padding: '10px', marginTop: '-15px', marginBottom: '125px' }}
                    dataSource={claim?.medicines_disbursed}
                    rowKey='drug_code'
                    // scroll={{ y: 230 }}
                    pagination={false}
                    columns={[
                        {
                            title: 'Drug Name',
                            dataIndex: 'drug_name',
                            width: '30%',
                            render: e => <p className={styles.tableValue}>{e}</p>
                        },
                        {
                            title: 'Drug Code',
                            dataIndex: 'drug_code',
                            width: '10%',
                            render: e => <p className={styles.tableValue}>{e}</p>
                        },
                        {
                            title: 'Unit Price',
                            dataIndex: '',
                            width: '13%',
                            render: e => <p className={styles.tableValue}>{e.unit_price + ' ' + e.currency}</p>
                        },
                        {
                            title: 'Quantity Dispensed',
                            dataIndex: 'quantity_dispensed',
                            width: '12%',
                            render: e => <p className={styles.tableValue}>{e}</p>
                        },
                        {
                            title: 'Total Price',
                            dataIndex: '',
                            width: '12%',
                            render: e => <p className={styles.tableValue}>{e.total_price + ' ' + e.currency}</p>
                        },
                        // {
                        //     title: 'Instructions',
                        //     dataIndex: 'instruction',
                        //     width: '20%',
                        //     render: e => <p className={styles.tableValue}>{e}</p>
                        // },
                    ]}
                />
            </div> : null}
        </Main >
    )
}

export default ClaimDetails;