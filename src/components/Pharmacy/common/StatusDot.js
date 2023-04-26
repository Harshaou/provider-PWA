import { useEffect } from 'react'
import styles from './index.module.css'

const StatusDot = ({ status }) => {
    const color =
        status === 'Pending' ? 'skyblue' : (status === 'In_Progress' ? 'rgb(254, 200, 40)' : (status === 'Approved' ? '#3ab44d' : (status === 'Declined' ? '#f87d4e' : 'gray')))
    return <div
        style={{
            backgroundColor: color,
            width: '12px',
            height: '12px',
            borderRadius: '15px',
            marginTop: '5px'
        }}
    > </div>
}

export default StatusDot;