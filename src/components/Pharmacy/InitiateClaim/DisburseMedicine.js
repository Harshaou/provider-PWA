import { Button, Input, notification, Radio, Table } from 'antd';
import CollapseInfo from './CollapseWithInfo';
import { useState } from 'react';
import PreviewTable from './PreviewTable';
import { useDispatch } from 'react-redux';
import { initiatePharmacyClaim } from '../../../store/pharmacySlice';
import { useNavigate } from 'react-router-dom';
const columns = [
  {
    title: 'Medicine Generic Name',
    dataIndex: 'generic_name',
    width: 160,
  },
  {
    title: 'Type',
    dataIndex: '',
    width: 105,
  },
  {
    title: 'Price/unit',
    dataIndex: '',
    width: 80,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    width: 80,
  },
  {
    title: 'Instructions',
    dataIndex: 'instructions',
    width: 150,
  },
];

const DisburseMedicine = ({ prescriptionValue }) => {
  const [selectedFieldValues, setSelectedFieldValues] = useState([]);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newDataArr = prescriptionValue?.prescribed_medicines?.map((item, index) => {
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
      <CollapseInfo info={prescriptionValue} />
      <div style={{ backgroundColor: 'white', padding: 15, position: 'relative' }}>
        <p style={{ fontWeight: 600, fontSize: 18, marginBottom: 5 }}>{title[step - 1]}</p>
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
        <div>
          <p style={{ marginBottom: 0, fontWeight: 500 }}>Prescription Unique Code</p>
          <p style={{ color: '#737373', fontSize: 13 }}>
            {prescriptionValue?.prescription_meta?.prescription_otp}
          </p>
        </div>

        {step === 1 ? (
          <div style={{ minHeight: 300, marginTop: 30 }}>
            <Table
              expandable={{
                expandRowByClick: true,
                expandedRowRender: (field, record) => (
                  <div
                    style={{
                      marginLeft: 100,
                    }}
                  >
                    <p style={{ fontWeight: 500, fontSize: 14, marginBottom: 5 }}>Medicine Name</p>
                    <Radio.Group
                      onChange={(e) => handleSelectedValues(field, e.target.value, 'radio')}
                    >
                      {field?.medicines?.map((item, index) => (
                        <Radio key={index} value={item.designation}>
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              width: '100%',
                            }}
                          >
                            <div style={{ width: 265 }}>
                              <span>{item.designation}</span>
                            </div>
                            <div style={{ width: 200 }}>
                              <span>{item.selling_unit}</span>
                            </div>
                            <div style={{ width: 200 }}>
                              <span>
                                {item.currency} {item.price?.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </Radio>
                      ))}
                    </Radio.Group>
                    <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        allowClear
                        pattern="\d+"
                        onChange={(e) => handleSelectedValues(field, e.target.value, 'quantity')}
                        placeholder="Enter the quantity disbursed"
                        style={{ width: 230, borderRadius: 10 }}
                      />
                    </div>
                  </div>
                ),
              }}
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
