import { Button, notification, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { deletePrescription } from '../../store/prescriptionSlice';

const AntTable = ({ data, page }) => {
  const navigate = useNavigate();
  const state = useSelector((state) => state.claims);
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Patient Name',
      dataIndex: 'member',
      render: (_, item) => item?.member?.name,
      width: 100,
    },
    {
      title: 'Doctor Name',
      dataIndex: 'doctor_name',
      width: 105,
    },
    {
      title: 'Disease Description',
      dataIndex: 'disease',
      width: 150,
    },
    {
      title: 'ICD Code',
      dataIndex: 'icd_code',
      width: 70,
    },
    {
      title: 'Date & Time',
      dataIndex: 'created_timestamp',
      render: (item) => moment(item).format('MMMM Do YYYY, H:mm '),
      width: 100,
    },

    {
      title: 'Action',
      dataIndex: 'member',
      render: (_, item) => (
        <div className="action" id="action">
          <Button
            className="action"
            id="action"
            onClick={() =>
              dispatch(
                deletePrescription({
                  id: item.prescription_code,
                  openNotificationWithIcon,
                  dispatch,
                  page,
                }),
              )
            }
            danger
            shape="round"
            size="small"
          >
            Delete
          </Button>
        </div>
      ),
      width: 80,
    },
  ];

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
    });
  };

  return (
    <>
      <Table
        loading={state.loading}
        onRow={(record) => {
          return {
            onClick: (e) => {
              if (e.target.innerText === 'Delete') {
                e.preventDefault();
              } else {
                navigate(`/prescription/${record.id}`);
              }
            },
          };
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="id"
      />
    </>
  );
};

export default AntTable;
