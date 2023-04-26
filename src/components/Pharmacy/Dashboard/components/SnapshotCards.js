
import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSnapShot } from '../../../../store/dashboardSlice';

const SnapshotCards = ({ items }) => {
    useEffect(() => {
        dispatch(getSnapShot());
    }, []);

    const { snapshot, loading } = useSelector((state) => state.dashboard);

    let arr = [
        { text: 'Total Claims', value: snapshot?.total_visits, color: '#E3F5FF' },
        { text: 'Pending Claims', value: snapshot?.total_pre_auths, color: '#CFDFEB' },
        { text: 'In Progress Claims', value: snapshot?.total_prescriptions, color: '#CFDFEB' },
        { text: 'Approved Claims', value: snapshot?.total_claims, color: '#E3F5FF' },

    ];

    const dispatch = useDispatch();

    const providerUser =
        localStorage.getItem('providerUser') && JSON.parse(localStorage.getItem('providerUser'));

    return (
        <div
            style={{
                display: 'grid',
                gap: 20,
                width: '100%',
            }}
        >
            {(providerUser?.role === 'Admin' || providerUser?.role === 'Super_Admin') && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 10,
                    }}
                >
                    {arr.map((item, index) => (
                        <div
                            className={styles.componentItem}
                            style={{
                                backgroundColor: item.color,
                            }}
                            key={index}
                        >
                            <div>
                                <p style={{ marginBottom: 3, fontSize: 13, fontWeight: 500 }}>{item.text}</p>
                                <p style={{ fontSize: 32, fontWeight: 500, marginBottom: 0 }}>{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}




        </div>
    );
};

export default SnapshotCards;
