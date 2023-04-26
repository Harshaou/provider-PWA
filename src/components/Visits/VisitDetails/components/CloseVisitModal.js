import { Button, Form, Input, Modal } from "antd";
import styles from './index.module.css'
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const CloseVisitModal = ({ visit, isModalOpen, setIsModalOpen }) => {
    const navigate = useNavigate()
    return (
        <Modal visible={isModalOpen} bodyStyle={{ padding: '0px' }} footer={null} >
            <div className={styles.modalContainer}>
                <Button
                    className={styles.closeBtn}
                    onClick={() => setIsModalOpen(false)}
                >
                    <CloseOutlined />
                </Button>
                <h3 className={styles.modalTitle}>Close Patient Visit</h3>
                <h4 className={styles.modalSubTitle}>Form to close a Patient Visit</h4>

                <Form onFinish={vals => setIsModalOpen(false, navigate('/visits'))}
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                >
                    <h4 className={styles.formLabel}>Enter the total cost of treatment</h4>
                    <Form.Item name='cost'
                        style={{ width: '100%' }}
                        rules={[
                            { required: true, message: 'Please enter total cost' },
                            { min: 0, message: 'Please enter valid cost' }
                        ]}>
                        <Input className={styles.input} type="number" placeholder="Enter the total cost of treatment" />
                    </Form.Item>
                    <h4 className={styles.formLabel}>Any Comment?</h4>
                    <Form.Item name='comments'
                        style={{ width: '100%' }}
                        rules={[
                            { required: false }
                        ]}>
                        <Input.TextArea allowClear rows={5} className={styles.input} placeholder="Enter any comment or description, if required" />
                    </Form.Item>
                    <Button
                        className={styles.closeVisitBtn}
                        type='primary'
                        htmlType="submit"
                    >
                        Close Visit
                    </Button>
                </Form>
            </div>
        </Modal >
    )
}

export default CloseVisitModal;