import { Button, Input, notification, Table } from 'antd';
import { useState } from 'react';
import PreviewTable from './PreviewTable';
import { useDispatch } from 'react-redux';
import { initiatePharmacyClaim } from '../../../store/pharmacySlice';
import { useNavigate } from 'react-router-dom';

const DisburseMedicine = ({ prescriptionValue }) => {
  const [selectedFieldValues, setSelectedFieldValues] = useState([]);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newDataArr = prescriptionValue?.medicines?.map((item, index) => {
    return { ...item, id: index + 1 };
  });

  const handleSelectedValues = (field, e, type) => {
    let tempObject = selectedFieldValues.find((item) => item.id === field.id) || {
      id: field.id,
      name: '',
      quantity: 0,
    };
    if (type === 'quantity') {
      tempObject = {
        ...tempObject,
        quantity: parseInt(e),
      };
    } else if (type === 'radio') {
      let foo = field.medicines.find((item) => item.designation === e);
      tempObject = {
        id: field.id,
        generic_name: field.generic_name,
        total_quantity: field.quantity,
        ...foo,
      };
    }

    const newSelectedFieldValues = [
      ...selectedFieldValues.filter((item) => item.id !== field.id),
      tempObject,
    ];
    setSelectedFieldValues(newSelectedFieldValues);
  };

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
    });
  };

  const handleSetPreview = () => {
    let updatedValue = {
      prescription_code: prescriptionValue.prescription_code,
      disbursed_medicines: selectedFieldValues.map((item) => {
        return {
          name: item.designation,
          quantity: item.quantity,
          price: item.price,
        };
      }),
    };

    dispatch(initiatePharmacyClaim({ updatedValue, navigate, openNotificationWithIcon }));
  };

  const handleEdit = () => {
    setStep(1);
    setSelectedFieldValues([]);
  };

  let isValid =
    Array.isArray(selectedFieldValues) && selectedFieldValues.length > 0
      ? selectedFieldValues.every((item) => !isNaN(item.quantity))
      : false;

  let title = ['Medications prescribed', 'Medications being disbursed'];

  const columns = [
    {
      title: 'Drug Name',
      dataIndex: 'drug_name',
      width: 160,
    },
    {
      title: 'Drug Code',
      dataIndex: 'drug_code',
      width: 105,
    },
    {
      title: 'Unit Price',
      dataIndex: 'unit_price',
      width: 80,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: 80,
    },
    {
      title: 'Instruction',
      dataIndex: 'instruction',
      render: (instruction) => (instruction ? instruction : '__'),
      width: 130,
    },
    {
      title: 'Deliverable Quantity',
      dataIndex: 'prescribed_by',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
          <Input
            type="number"
            min="0"
            step="1"
            allowClear
            pattern="\d+"
            onChange={(e) => handleSelectedValues(record, e.target.value, 'quantity')}
            placeholder="Enter the quantity disbursed"
            style={{ width: 230, borderRadius: 10 }}
          />
        </div>
      ),
      width: 170,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
      <div style={{ backgroundColor: 'white', padding: 20, position: 'relative' }}>
        {step === 2 && (
          <Button
            onClick={() => handleEdit()}
            style={{ position: 'absolute', top: '5%', right: '3%' }}
            shape="round"
            type="dashed"
          >
            Edit
          </Button>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '40%',
            marginBottom: 30,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span>Patient Name</span>
            <span>Member No.</span>
            <span>Patient Name</span>
            <span>Member No.</span>
            <span>Patient Name</span>
            <span>Member No.</span>
            <span>Patient Name</span>
            <span>Member No.</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              color: '#737373',
              textAlign: 'right',
            }}
          >
            <span>{prescriptionValue?.gender ? prescriptionValue?.gender : '--'}</span>
            <span>
              {prescriptionValue?.date_of_birth ? prescriptionValue?.date_of_birth : '--'}
            </span>
          </div>
        </div>
        {/* <p style={{ fontWeight: 600, fontSize: 18, marginBottom: 5 }}>{title[step - 1]}</p> */}
        <div>
          <p style={{ marginBottom: 0, fontWeight: 500 }}>Prescription OTP</p>
          <p style={{ color: '#737373', fontSize: 13, marginBottom: 5 }}>
            {prescriptionValue?.prescription_id}
          </p>
        </div>

        {step === 1 ? (
          <div style={{ minHeight: 300, marginTop: 10 }}>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={newDataArr}
              pagination={false}
              scroll={{
                y: 400,
              }}
            />
          </div>
        ) : (
          <PreviewTable selectedFieldValues={selectedFieldValues} />
        )}
      </div>
      <div>
        {step === 1 && (
          <Button
            onClick={() => setStep(2)}
            disabled={isValid === false ? true : false}
            shape="round"
            type="primary"
            size="large"
            style={{ float: 'right', marginBottom: 40, marginTop: 10 }}
          >
            Disburse Medicines
          </Button>
        )}

        {step === 2 && (
          <Button
            onClick={() => handleSetPreview()}
            shape="round"
            type="primary"
            size="large"
            style={{ float: 'right', marginBottom: 40, marginTop: 10 }}
          >
            Initiate Claim
          </Button>
        )}
      </div>
    </div>
  );
};

export default DisburseMedicine;
