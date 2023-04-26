import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Form,
  Input,
  notification,
  Table,
} from 'antd';
import { resetMember } from '../../../store/dashboardSlice';
import { useNavigate } from 'react-router-dom';
import CollapseInfo from './CollapseWithInfo';
import benefits from './benefits.json'
import { createVisit } from '../../../store/dashboardSlice';
const VisitForm = ({ member }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();



  const handleFinish = () => {
    form.resetFields();
    openNotificationWithIcon(
      'success',
      'New Visit has been created.',
    );
    navigate('/visits');
  };

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: type === 'success' ? 'Successful' : 'Error',
      description: msg,
    });
  };

  const [benefitsData, setBenefitsData] = useState(benefits)
  const [search, setSearch] = useState('')

  useEffect(() => {
    // console.log(search)
    console.log(benefitsData.filter(a => a.benefits.filter(b => b.benefit_description.includes(search))).length > 0)
  }, [search])

  return (
    <div
      style={{
        width: '90%',
      }}
    >
      <CollapseInfo member={member} />
      <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '18px' }}>Available Benefits</h3>
        <Input style={{ width: '425px', borderRadius: '15px' }} onChange={e => setSearch(e.target.value)} placeholder="Search Benefit" />
      </div>
      <Table
        style={{ marginTop: '15px' }}
        columns={[
          {
            key: 'benefit_description',
            title: 'Benefit Description',
            dataIndex: 'benefit_description',
            width: '8%'
          },
          {
            key: 'limit',
            title: 'Limit',
            dataIndex: 'limit',
            width: '10%'
          },
          {
            key: 'cover_type',
            title: 'Cover Type',
            dataIndex: 'cover_type',
            width: '10%'
          },
          {
            key: 'preauth_rule',
            title: 'Pre-Auth Rule',
            dataIndex: 'preauth_rule',
            width: '10%'
          },
          {
            key: 'waiting_period',
            title: 'Waiting Period',
            dataIndex: 'waiting_period',
            width: '5%'
          },
          {
            key: 'copay',
            title: 'Co-Pay',
            dataIndex: 'copay',
            width: '8%'
          },
          {
            key: 'exclusions',
            title: 'Exclusions',
            dataIndex: 'exclusions',
            width: '50%'
          },
        ]}
        expandedRowRender={(item) => {
          console.log(item.benefits)
          return <Table
            pagination={false}
            scroll={{ y: '350px' }}
            columns={[
              {
                key: 'benefit_description',
                title: 'Benefit Description',
                dataIndex: 'benefit_description',
                width: '45%'
              },
              {
                key: 'sublimit',
                title: 'Sub Limit',
                dataIndex: 'limit',
              },
              {
                key: 'cover_type',
                title: 'Cover Type',
                dataIndex: 'cover_type',
              },
              {
                key: 'preauth_rule',
                title: 'Pre-Auth Rule',
                dataIndex: 'preauth_rule',
              },
              {
                key: 'waiting_period',
                title: 'Waiting Period',
                dataIndex: 'waiting_period',
              },
              {
                key: 'copay',
                title: 'Co-Pay',
                dataIndex: 'copay',
              },
            ]}
            dataSource={item.benefits}
          />
        }
        }
        pagination={false}
        dataSource={benefitsData}

      />
      <div style={{ float: 'right', marginTop: 40, marginBottom: 50 }}>
        <Button style={{ marginRight: 10 }} onClick={() => { dispatch(resetMember()); navigate(-1) }} shape="round">
          Cancel
        </Button>
        <Button onClick={() => { dispatch(resetMember()); dispatch(createVisit({ member })); navigate('/visits'); handleFinish() }} type="primary" shape="round">
          Create Visit
        </Button>
      </div>
    </div>
  );
};

export default VisitForm;
