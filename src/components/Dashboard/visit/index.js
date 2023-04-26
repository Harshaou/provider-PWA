import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import VisitStepOne from './VisitStepOne';
import VisitStepThree from './VisitStepThree';
import VisitStepTwo from './VisitStepTwo';
import closeIcon from '../../../img/close-modal.png';

const NewVisit = ({ isModalOpen, setIsModalOpen }) => {
  const [step, setStep] = useState(0);
  const [memberNumber, setMemberNumber] = useState('');
  const [uniqueKey, setUniqueKey] = useState('');
  useEffect(() => { console.log(isModalOpen) }, [isModalOpen])
  return (
    <Modal width={520} footer={null} visible={isModalOpen}>
      <img
        onClick={() => {
          setStep(0);
          setIsModalOpen(false);
        }}
        src={closeIcon}
        alt=""
        style={{ height: 24, position: 'absolute', top: 10, right: 15, cursor: 'pointer' }}
      />
      <div style={{ marginBottom: 15 }}>
        {step === 0 && (
          <VisitStepOne
            setMemberNumber={setMemberNumber}
            memberNumber={memberNumber}
            setStep={setStep}
          />
        )}
        {step === 1 && (
          <VisitStepTwo
            setMemberNumber={setMemberNumber}
            setUniqueKey={setUniqueKey}
            memberNumber={memberNumber}
            setStep={setStep}
          />
        )}
        {step === 2 && (
          <VisitStepThree
            memberNumber={memberNumber}
            setIsModalOpen={setIsModalOpen}
            uniqueKey={uniqueKey}
            setStep={setStep}
          />
        )}
      </div>
    </Modal>
  );
};
export default NewVisit;
