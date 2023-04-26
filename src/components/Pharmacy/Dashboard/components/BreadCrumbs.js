import { useNavigate } from 'react-router-dom';
import MemberCard from '../../../Common/MemberCard';
import styles from './index.module.css'

const BreadCrumbs = ({ BreadCrumbsItems }) => {
    const navigate = useNavigate()
    return (
        <div style={{ display: 'flex', gap: '5px' }}>
            {BreadCrumbsItems.slice(0, BreadCrumbsItems.length - 1).map((item, i) =>
                item?.type === 'user' ?
                    <MemberCard />
                    : (item.link ? <p onClick={() => navigate(item?.link, { state: item?.state })} key={i} className={styles.breadCrumbs}>{item?.label} / </p> :
                        <p key={i} className={styles.breadCrumbs}>{item?.label} / </p>)
            )}
            <p className={styles.breadCrumbsLast}>{BreadCrumbsItems[BreadCrumbsItems.length - 1]?.label} </p>
        </div >
    )
}

export default BreadCrumbs;