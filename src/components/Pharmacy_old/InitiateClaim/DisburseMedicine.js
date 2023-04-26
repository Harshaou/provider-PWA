import { Button, Input, notification, Table } from 'antd';
import { useState } from 'react';
import PreviewTable from './PreviewTable';
import { useDispatch } from 'react-redux';
import { initiatePharmacyClaim } from '../../../store/pharmacySlice';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import styles from './index.module.css';

const DisburseMedicine = ({ prescriptionValue }) => {
  const [selectedFieldValues, setSelectedFieldValues] = useState([]);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newDataArr = prescriptionValue?.medicines?.map((item, index) => {
    return { ...item, id: index + 1 };
  });

  const handleSelectedValues = (field, e) => {
    //add the new value to the array
    if (e) {
      let tempObject = {
        ...field,
        deliverableQTY: parseInt(e),
      };

      console.log('tempObject', tempObject);

      const newSelectedFieldValues = [
        ...selectedFieldValues.filter((item) => item.id !== field.id),
        tempObject,
      ];
      setSelectedFieldValues(newSelectedFieldValues);
    }
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

  let title = ['Prescribed Medications Details', 'Medications being disbursed'];

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
            onChange={(e) => handleSelectedValues(record, e.target.value)}
            placeholder="Enter the quantity disbursed"
            style={{ width: 230, borderRadius: 10 }}
          />
        </div>
      ),
      width: 170,
    },
  ];

  console.log('selectedFieldValues', selectedFieldValues);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
      <div
        style={{
          backgroundColor: 'white',
          padding: 20,
          position: 'relative',
          borderRadius: 10,
          paddingLeft: 30,
        }}
      >
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
        <div style={{ marginBottom: 30 }}>
          <p style={{ fontWeight: 600, fontSize: 18, marginBottom: 0 }}>{title[step - 1]}</p>
          <div>
            <p style={{ marginBottom: 0, fontWeight: 500 }}>Prescription OTP</p>
            <p style={{ color: '#737373', fontSize: 13 }}>{prescriptionValue?.prescription_id}</p>
          </div>
        </div>
        {step === 1 && (
          <header className={styles.container}>
            <article className={styles.patientInfo}>
              <section>
                <h3>Patient Name</h3>
                <p>{prescriptionValue?.patient_name || '--'}</p>
              </section>
              <section>
                <h3>Member No.</h3>
                <p>{prescriptionValue?.member_number || '--'}</p>
              </section>
            </article>

            <article className={styles.prescriptionInfo}>
              <section>
                <h3>Attending Doctor</h3>
                <p> {prescriptionValue?.attending_doctor_name}</p>
              </section>
              <section>
                <h3>Doctor Specialization</h3>
                <p> {prescriptionValue?.attending_doctor_specialisation}</p>
              </section>
            </article>
            <article className={styles.providerInfo}>
              <section>
                <h3>Provider Name</h3>
                <p>{prescriptionValue?.provider_name}</p>
              </section>
              <section style={{ marginTop: -3 }}>
                <h3>Provider Address</h3>
                <p>{prescriptionValue?.provider_address}</p>
              </section>
            </article>
          </header>
        )}

        {step === 1 ? (
          <div style={{ minHeight: 300, marginTop: 25 }}>
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
