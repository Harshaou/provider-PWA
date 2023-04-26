


import { Button, Form, Input, InputNumber, Popover, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Main from '../../../template';
import { baseUrl } from '../../../utils';
import BreadCrumbs from '../Dashboard/components/BreadCrumbs';
import styles from './index.module.css';
import Receipt from './Receipt';

const FillPrescription = () => {

    const navigate = useNavigate()

    const { prescription_id } = useParams()
    const { state } = useLocation()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const [prescription, setPrescription] = useState()
    const [memberBenefits, setMemberBenefits] = useState()

    useEffect(() => {
        if (state) {
            setPrescription(state?.prescription, setMemberBenefits(state?.member_benefit_balance, setLoading(false)))
        }
    }, [state])

    // useEffect(() => {
    //     console.log(prescription)
    // }, [prescription])

    const [disbursed, setDisbursed] = useState(false)

    const [receipt, setReceipt] = useState()

    const disburseMedicines = async (e) => {
        setLoading(true)
        const data = Object.keys(e).map(code => { return ({ drug_code: code.split('_')[2], quantity_dispensed: e[code] }) }).filter(d => d.quantity_dispensed !== 0)
        await fetch(`${baseUrl}/provider/rx/receipt/${prescription?.prescription_id}`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${localStorage.getItem('x-auth-token')}`,
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(res => {
                if (res?.api?.responseCode === 2010) setReceipt(res?.result, setDisbursed(true))
                else {
                    setError(res?.message)
                }
            })
            .catch(e => console.log(e))
            .finally(() => setLoading(false))
    }

    return (
        <Main>
            {/* {prescription && !loading ? */}
            <div>
                <BreadCrumbs BreadCrumbsItems={[{ label: 'Dashboard', link: '/' }, { label: 'Fill Prescription', link: '/', state: { openVisitModal: true } }, { label: 'Prescription #' + prescription?.prescription_id }, disbursed ? { label: 'Receipt' } : null]} />
                {disbursed ?
                    <Receipt receipt={receipt} />
                    :
                    <div style={{ display: 'flex', gap: '20px', marginTop: '15px', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
                            <div
                                className={styles.cardShadow}
                                style={{ width: '75%', padding: '25px', paddingBottom: '10px' }}
                            >
                                <p className={styles.cardTitle} style={{ marginTop: '0px' }}>Prescription Details</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '0px', columnGap: '25px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '0px' }}>
                                        <p className={styles.cardLabel} >Patient Name</p>
                                        <p className={styles.cardValue}>{prescription?.patient_name}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-5px' }}>
                                        <p className={styles.cardLabel} >Member Number</p>
                                        <p className={styles.cardValue}>{prescription?.member_number}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-5px' }}>
                                        <p className={styles.cardLabel} >Provider</p>
                                        <p className={styles.cardValue}>{prescription?.provider_name}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-5px' }}>
                                        <p className={styles.cardLabel} >Provider Address</p>
                                        <p className={styles.cardValue}>{prescription?.provider_address}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-5px' }}>
                                        <p className={styles.cardLabel} >Attending Doctor</p>
                                        <p className={styles.cardValue}>{prescription?.attending_doctor_name}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-5px' }}>
                                        <p className={styles.cardLabel} >Doctor Specialization</p>
                                        <p className={styles.cardValue}>{prescription?.attending_doctor_specialisation}</p>
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
                            style={{ width: '100%' }}
                        >
                            <p className={styles.cardTitle} style={{ margin: '10px 25px', marginTop: '0px' }}>Prescribed Medications</p>
                            <Form onFinish={disburseMedicines}>
                                <Table
                                    style={{ width: '100%', padding: '10px', marginTop: '-15px', marginBottom: '125px' }}
                                    dataSource={prescription?.medicines}
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
                                            render: e => <p className={styles.tableValue}>{e?.unit_price + ' ' + e?.currency}</p>
                                        },
                                        {
                                            title: 'Quantity',
                                            dataIndex: 'quantity',
                                            width: '10%',
                                            render: e => <p className={styles.tableValue}>{e}</p>
                                        },
                                        {
                                            title: 'Instructions',
                                            dataIndex: 'instruction',
                                            width: '20%',
                                            render: e => <p className={styles.tableValue}>{e || '--'}</p>
                                        },
                                        {
                                            title: 'Deliverable Quantity',
                                            width: '20%',
                                            render: e =>
                                                <Form.Item
                                                    rules={[
                                                        { type: 'number', max: e.quantity, min: 0, message: 'Enter Valid Quantity' },
                                                        { required: true, message: 'Enter Quantity' },
                                                    ]}
                                                    name={'deliverable_quantity_' + e.drug_code}
                                                    style={{ margin: '0px' }} >
                                                    <InputNumber
                                                        controls={false}
                                                        className={styles.input}
                                                        type='number'
                                                    />
                                                </Form.Item>

                                        },
                                    ]}
                                />
                                <div style={{
                                    display: 'flex', flexDirection: 'column', position: 'absolute',
                                    right: '25px',
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
                                        htmlType='submit'
                                        className={styles.button}
                                    >Disburse Medicines</Button>
                                </div>
                            </Form>
                        </div>


                    </div>}
            </div>
            {/* :
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Invalid Prescription</p>
                </div>
            } */}

        </Main >
    )
}

export default FillPrescription;