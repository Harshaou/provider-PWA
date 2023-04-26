import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../../../template';
import { baseUrl } from '../../../utils';
import StatusDot from '../common/StatusDot';
import BreadCrumbs from '../Dashboard/components/BreadCrumbs';
import styles from './index.module.css'

const Claims = () => {

    const [loading, setLoading] = useState(false)

    const [claims, setClaims] = useState([])
    const [properties, setProperties] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            setLoading(true)
            await fetch(`${baseUrl}/pharmacy/claims`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('x-auth-token')}`,
                },
            }).then(res => res.json())
                .then(res => {
                    if (res?.api?.responseCode === 2040) {
                        setClaims(res?.result?.content, setProperties(res?.result?.property))
                    }
                    else {
                        console.log(res?.message)
                    }
                }).catch(e => console.log(e))
                .finally(() => setLoading(false))
        })()
    }, [])
    return (
        <Main>
            <BreadCrumbs BreadCrumbsItems={[{ label: 'Dashboard', link: '/' }, { label: 'Claims', link: '/claims' }]} />
            <div style={{ marginTop: '15px' }} />
            <div
                className={styles.cardShadow}
                style={{ padding: '25px 0px' }}>
                <p className={styles.cardTitle} style={{ margin: '10px 25px', marginTop: '0px' }}>Claims</p>
                <Table
                    rowKey='claim_id'
                    dataSource={claims}
                    loading={loading}
                    style={{ marginTop: '25px', margin: '0px 10px' }}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (e) => {
                                console.log(record?.claim_id)
                                navigate('/claims/' + record?.claim_id);

                            },
                        };
                    }}
                    columns={[
                        {
                            title: 'Claim ID',
                            dataIndex: 'claim_id',
                            render: e => <p className={styles.tableValue}>{e}</p>
                        },
                        {
                            title: 'Patient Name',
                            dataIndex: 'patient_name',
                            render: e => <p className={styles.tableValue}>{e}</p>
                        },
                        {
                            title: 'Member Number',
                            dataIndex: 'member_number',
                            render: e => <p className={styles.tableValue}>{e}</p>
                        },
                        {
                            title: 'Claim Amount',
                            dataIndex: '',
                            render: e => <p className={styles.tableValue}>{e?.claim_amount + ' ' + e?.currency}</p>
                        },
                        {
                            title: <div>
                                Status
                            </div>,
                            dataIndex: 'status',
                            render: e => <div style={{ display: 'flex', gap: '5px' }}>
                                <StatusDot status={e} />
                                <p className={styles.tableValue}>{e}</p>
                            </div>
                        },
                        {
                            title: 'Timestamp',
                            dataIndex: 'created_timestamp',
                            render: e => <p className={styles.tableValue}>{e}</p>
                        }
                    ]}
                />
            </div>
        </Main>
    )
}

export default Claims;