import { useEffect, useState } from 'react';
import Main from '../../../template';
import MemberCard from '../../Common/MemberCard';
import styles from './index.module.css';
import { AutoComplete, Button, Form, Input, notification, Table } from 'antd';
import ICDdata from '../../../utils/ICD.json';
import UseIcdOptions from '../../Common/hooks/UseIcdOptions';
import DocData from '../../../utils/doctors.json';

import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../utils';
import { createPrescription } from '../../../store/prescriptionSlice';
import UseDoctorsOptions from '../../Common/hooks/UseDoctorsOptions';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

const CreateClaim = () => {
  const [form] = Form.useForm();
  const [formTwo] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formLoaded, setFormLoading] = useState(false);
  const [icdCode, setIcdCode] = useState('');
  const [icdCodeTwo, setIcdCodeTwo] = useState('');
  const [disease, setDisease] = useState('');
  const [diseaseTwo, setDiseaseTwo] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [icdCodeColCount, setIcdCodeColCount] = useState(1);
  const [doctorDescription, setDoctorDescription] = useState('');
  const [doctorsOptions, setDoctorsOptions] = useState([{ label: '', value: '' }]);
  const [icdOptions, setIcdOptions] = useState([{ label: '', value: '' }]);

  const [medicineData, setMedicineData] = useState([]);
  const [medicineOptions, setMedicineOptions] = useState([{ label: '', value: '' }]);
  const [prescribedMedicine, setPrescribedMedicine] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getMedicines();
  }, []);

  const onDocSelect = (e) => {
    setDoctorDescription(DocData.filter((val) => val.Name === e)[0].discipline);
    setDoctorName(e);
    setFormLoading(true);
  };

  useEffect(() => {
    getMember();
    if (visit?.attending_doctor_name) {
      onDocSelect(visit?.attending_doctor_name);
    } else {
      setFormLoading(true);
    }
  }, []);

  const location = useLocation();
  const visit = location.state?.visit;
  const visitId = location.state?.visit?.visit_id;

  const getMedicines = async () => {
    let token = localStorage.getItem('x-auth-token');
    try {
      const response = await axios.get(`${baseUrl}/provider/rx/drug/list`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setMedicineData(response?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  const onICDSelect = (e) => {
    const item = ICDdata.filter((val) => val.desc === e)[0].code;
    setIcdCode(item);
    setDisease(e);
  };

  const onICDSelectTwo = (e) => {
    const item = ICDdata.filter((val) => val.desc === e)[0].code;
    setIcdCodeTwo(item);
    setDiseaseTwo(e);
  };
  const handleSubmit = async () => {
    let diagnosisArray = icdCodeTwo
      ? [
        { icd_code: icdCodeTwo, name: diseaseTwo },
        { icd_code: icdCode, name: disease },
      ]
      : [{ icd_code: icdCode, name: disease }];

    prescribedMedicine.map((val) => {
      const drugCode = medicineData.filter((val2) => val2.drug_name === val.drug_name)[0].drug_code;
      val.drug_code = drugCode;
    });

    let updatedValue = JSON.stringify({
      visit_id: visitId,
      diagnosis: diagnosisArray,
      attending_doctor_name: doctorName,
      attending_doctor_specialisation: doctorDescription,
      medicines: prescribedMedicine.map(({ id, ...rest }) => rest),
    });

    dispatch(createPrescription({ updatedValue, navigate, openNotificationWithIcon, setLoading }));
  };

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
    });
  };

  const handleAddMedicine = (values) => {
    if (medicineData.find((val) => val?.drug_name === values?.drug_name)) {
      setPrescribedMedicine([...prescribedMedicine, { ...values, id: Date.now() }]);
      formTwo.resetFields();
    }
  };

  const UseMedicineOptions = (e, setMedicineOptions) => {
    const options = medicineData.filter((val) =>
      val.drug_name?.toLowerCase().includes(e.toLowerCase()),
    );

    setMedicineOptions(
      options.map((val) => {
        return { label: val.drug_name, value: val.drug_name };
      }),
    );
  };

  const columns = [
    {
      title: 'Drug Name',
      dataIndex: 'drug_name',
      width: 160,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: 105,
    },
    {
      title: 'Instructions',
      dataIndex: 'instruction',
      width: 150,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (item) => (
        <Button
          onClick={() =>
            setPrescribedMedicine(prescribedMedicine.filter((medItem) => medItem.id !== item))
          }
          danger
          shape="round"
          size="small"
        >
          Remove
        </Button>
      ),
      width: 100,
    },
  ];

  const doubleICDcode = () => (
    <div style={{ display: 'flex', gap: 10, marginBottom: 5, marginTop: 10 }}>
      <div style={{ width: '36%' }}>
        <span style={{ fontSize: 12 }}>Disease Description </span>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Please input description!',
            },
          ]}
          style={{ marginBottom: 0 }}
          name="disease2"
        >
          <AutoComplete
            options={icdOptions}
            id="autoComplete"
            onSelect={onICDSelectTwo}
            onSearch={(e) => UseIcdOptions(e, setIcdOptions)}
            placeholder="Disease Description"
            onClear={() => setIcdCodeTwo('')}
            allowClear
          />
        </Form.Item>
      </div>

      <div style={{ width: '15%' }}>
        <span style={{ fontSize: 12 }}>ICD-10 Code</span>
        <Form.Item style={{ marginBottom: 0 }} name="icdCode">
          <Input
            style={{ width: 375, borderRadius: 15, height: 45 }}
            // className={styles.formInput}
            placeholder={icdCodeTwo}
            value={icdCodeTwo}
            disabled
            allowClear
          />
        </Form.Item>
      </div>
    </div>
  );

  const [member, setMemberData] = useState();
  const getMember = async () => {
    let token = localStorage.getItem('x-auth-token');
    await fetch(`${baseUrl}/provider/visit/${visitId}/member-info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setMemberData(res?.result?.member);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  };

  console.log('prescribedMedicine', prescribedMedicine);

  const [memberHover, setMemberHover] = useState(false);
  return (
    <Main>
      <div style={{ display: 'flex', gap: '5px', alignItems: 'center', marginTop: '-50px' }}>
        <a href="/Prescription" className={styles.breadCrumb1}>
          Prescription /{' '}
        </a>
        <MemberCard setHover={setMemberHover} visitID={visitId} />
      </div>

      <h3 className={styles.headerText}>
        Create Prescription for Visit<span style={{ fontWeight: '400' }}> #{visit?.visit_id}</span>
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          <div
            className={styles.cardShadow}
            style={{
              padding: '25px',
              position: 'relative',
              display: 'flex',
              gap: '17px',
              width: '90%',

              filter: memberHover ? 'blur(2px)' : null,
            }}
          >
            {formLoaded && (
              <div
                style={{
                  display: 'flex',
                  gap: '17px',
                  flexDirection: 'column',
                  minHeight: '75vh',
                  overflowY: 'scroll',
                  width: '100%',
                }}
              >
                <h3 className={styles.cardTitle}>Prescription form</h3>
                <div style={{ width: '100%' }}>
                  <Form
                    name="newForm"
                    form={form}
                    style={{ display: 'flex', marginBottom: 5, flexDirection: 'column' }}
                    initialValues={{
                      currency: 'Rwf',
                      attending_doctor_name: doctorName,
                    }}
                    onFinish={handleSubmit}
                  >
                    <div style={{ display: 'flex', gap: 10 }}>
                      <div style={{ width: '36%' }}>
                        <span style={{ fontSize: 12 }}>
                          Disease Description{' '}
                          {icdCodeColCount === 1 ? (
                            <PlusCircleOutlined
                              onClick={() => setIcdCodeColCount(2)}
                              style={{ cursor: 'pointer', color: '#3ab44d' }}
                            />
                          ) : (
                            <MinusCircleOutlined
                              onClick={() => {
                                setIcdCodeColCount(1);
                                setIcdCodeTwo('');
                              }}
                              style={{ cursor: 'pointer', color: '#3ab44d' }}
                            />
                          )}
                        </span>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: 'Please input description!',
                            },
                          ]}
                          style={{ marginBottom: 0 }}
                          name="disease"
                        >
                          <AutoComplete
                            options={icdOptions}
                            style={{
                              width: '100%',
                            }}
                            onSelect={onICDSelect}
                            id="autoComplete"
                            onSearch={(e) => UseIcdOptions(e, setIcdOptions)}
                            placeholder="Disease Description"
                            onClear={() => setIcdCode('')}
                            allowClear
                          />
                        </Form.Item>
                      </div>

                      <div style={{}}>
                        <span style={{ fontSize: 12 }}>ICD-10 Code</span>
                        <Form.Item style={{ marginBottom: 0 }} name="icdCode">
                          <Input
                            style={{ borderRadius: 15, width: 375, height: 45 }}
                            placeholder={icdCode}
                            value={icdCode}
                            disabled
                            allowClear
                          />
                        </Form.Item>
                      </div>
                    </div>

                    {icdCodeColCount > 1 && doubleICDcode()}

                    <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                      <div style={{ width: '36%' }}>
                        <span style={{ fontSize: 12 }}>{`Doctor's Name`}</span>
                        <Form.Item
                          name="attending_doctor_name"
                          rules={[
                            {
                              required: true,
                              message: 'This field cannot be empty',
                            },
                          ]}
                          style={{ marginBottom: 5 }}
                        >
                          <AutoComplete
                            options={doctorsOptions}
                            id="autoComplete"
                            onSelect={onDocSelect}
                            onSearch={(e) => UseDoctorsOptions(e, setDoctorsOptions)}
                            placeholder="Doctor's Name"
                            onClear={() => {
                              setDoctorDescription('');
                              setDoctorsOptions([{ label: '', value: '' }]);
                            }}
                            allowClear
                          />
                        </Form.Item>
                      </div>

                      <div style={{}}>
                        <span style={{ fontSize: 12 }}>{`Doctor's Discipline`}</span>
                        <Form.Item name="icd_code" style={{ width: 375, marginBottom: 5 }}>
                          <Input
                            style={{ width: '100%', borderRadius: 15, height: 45 }}
                            placeholder={doctorDescription}
                            value={doctorDescription}
                            disabled
                            allowClear
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </Form>

                  <Form
                    form={formTwo}
                    name="medicineForm"
                    autoComplete="off"
                    onFinish={handleAddMedicine}
                  >
                    <div style={{ display: 'flex', gap: 10, width: '100%', marginTop: 10 }}>
                      <div style={{ width: '36%' }}>
                        <span style={{ fontSize: 12 }}>{`Search Medicine`}</span>
                        <Form.Item
                          rules={[{ required: true, message: 'Please input medicine name' }]}
                          name="drug_name"
                          style={{ width: '100%' }}
                        >
                          <AutoComplete
                            options={medicineOptions}
                            id="autoComplete"
                            style={{
                              width: '100%',
                            }}
                            onSearch={(e) => UseMedicineOptions(e, setMedicineOptions)}
                            placeholder="Search Medicines"
                            allowClear
                          />
                        </Form.Item>
                      </div>

                      <div style={{ width: '15%' }}>
                        <span style={{ fontSize: 12 }}>{`Quantity`}</span>
                        <Form.Item
                          rules={[{ required: true, message: 'Please input quantity' }]}
                          name="quantity"
                          normalize={(value) => Number(value)}
                          style={{ width: '100%' }}
                        >
                          <Input
                            min="0"
                            type="number"
                            step="1"
                            allowClear
                            pattern="\d+"
                            style={{ borderRadius: 15, height: 45 }}
                            placeholder="Quantity"
                          />
                        </Form.Item>
                      </div>

                      <div style={{ width: '34%' }}>
                        <span style={{ fontSize: 12 }}>{`Instruction`}</span>
                        <Form.Item name="instruction" style={{ width: '100%' }}>
                          <Input
                            style={{ borderRadius: 15, height: 45 }}
                            placeholder="Instructions (optional)"
                            allowClear
                          />
                        </Form.Item>
                      </div>
                      <Form.Item style={{ marginTop: 22 }}>
                        <Button
                          disabled={prescribedMedicine.length > 3 ? true : false}
                          htmlType="submit"
                          icon={<PlusOutlined />}
                          type="dashed"
                          style={{ borderRadius: 15, height: 45 }}
                        >
                          {prescribedMedicine.length > 3 ? 'Limit exceeded' : 'Add'}
                        </Button>
                      </Form.Item>
                    </div>
                  </Form>
                  {prescribedMedicine.length > 0 && (
                    <>
                      <p style={{ marginBottom: 10 }}>{prescribedMedicine.length} item Added</p>
                      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <Table
                          className="prescriptison"
                          rowKey="id"
                          columns={columns}
                          dataSource={prescribedMedicine}
                          pagination={false}
                          scroll={{
                            y: 180,
                          }}
                        />
                      </div>
                    </>
                  )}
                  {prescribedMedicine.length > 0 && (
                    <Button
                      loading={loading}
                      onClick={() => form.submit()}
                      disabled={prescribedMedicine.length > 0 ? false : true}
                      shape="round"
                      type="primary"
                      size="large"
                      style={{ float: 'right', marginTop: 20 }}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default CreateClaim;
