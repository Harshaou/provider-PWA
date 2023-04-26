import { Button, Modal, Form, Input, DatePicker, Select } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import CloseModalImg from '../../img/close-modal.png';
import {
  addHardCodeData,
  approvedPreAuthsReport,
  getPaymentReport,
  pendingClaimsReport,
} from '../../store/reportSlice';
import moment from 'moment';
import { preventMinus } from '../Common/HelperFunctions';

const GenerateReport = ({ setIsModalVisible, isModalVisible, title, status, loading }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [fromDate, setFromDate] = useState(new Date());

  const onFinish = (values) => {
    const data = [];

    for (let i = 0; i < 5; i++) {
      data.push({
        id: i,
        key: i,
        name: 'John Joseph',
        memberNumber: '#45454',
        phone: '09343432348',
        documents: [],
        moreInfo: 'More info',
        approve: 'Approve',
        reject: 'Reject',
        status: 'Pending',
      });
    }

    dispatch(addHardCodeData(data));
    setIsModalVisible(false);
    form.resetFields();
  };

  const { Option } = Select;

  const disabledDate = (current) => {
    return current && current < fromDate;
  };

  return (
    <>
      <Modal
        className="fileClaim"
        bodyStyle={{ padding: 50 }}
        footer={null}
        visible={isModalVisible}
      >
        <div
          onClick={() => setIsModalVisible(false)}
          style={{ cursor: 'pointer' }}
          className="modalCloseIcon"
        >
          <img src={CloseModalImg} style={{ width: 28 }} alt="" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 35 }}>
          <div>
            <h1 className="mbZero">{title}</h1>
            <h5 className="mbZero">Fill in the form below to make filter</h5>
          </div>

          <Form form={form} className="wFull" name="basic" onFinish={onFinish}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15, width: '100%' }}>
              <div style={{ width: '50%' }}>
                <label>From Date</label>
                <Form.Item
                  name="from"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker
                    className="fromDatePicker"
                    placeholder="Date from"
                    style={{ borderRadius: 20, width: '100%' }}
                    size="large"
                    format="YYYY/MM/DD"
                    onChange={(d) => setFromDate(d, form.resetFields(['to']))}
                  />
                </Form.Item>
              </div>
              <div style={{ width: '50%' }}>
                <label>To Date</label>
                <Form.Item
                  name="to"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker
                    disabledDate={disabledDate}
                    placeholder="Date to"
                    style={{ borderRadius: 20, width: '100%' }}
                    size="large"
                    format="YYYY/MM/DD"
                  />
                </Form.Item>
              </div>
            </div>
            <label>Status</label>
            <Form.Item
              name="status"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select size="large" placeholder="Status">
                {status?.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <label>Amount</label>
            <Form.Item name="amount">
              <Input
                placeholder="Amount"
                style={{ borderRadius: 20 }}
                size="large"
                type="number"
                onKeyPress={preventMinus}
              />
            </Form.Item>
          </Form>

          <Button
            loading={loading}
            onClick={() => form.submit()}
            size="large"
            style={{ width: '55%' }}
            type="primary"
            shape="round"
          >
            Generate Report
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default GenerateReport;
