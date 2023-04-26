import { Divider, Modal } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const CollapseContentModal = ({ isModalOpen, setIsModalOpen, exclusions, title }) => {
  return (
    <Modal
      // title={title}
      footer={null}
      open={isModalOpen}
      onOk={() => setIsModalOpen()}
      width={750}
      onCancel={() => setIsModalOpen()}
    >
      <CloseCircleOutlined
        onClick={() => setIsModalOpen(false)}
        style={{ position: 'absolute', right: 20, top: 10, color: '#3ab44d', fontSize: 24 }}
      />
      <h3>{title}</h3>
      <ul
        style={{
          position: 'relative',
          padding: 20,
          maxHeight: '60vh',
          overflow: 'scroll',
          marginTop: 20,
        }}
      >
        {exclusions?.map((item, index) => (
          <>
            <li style={{}} key={index}>
              <span style={{ marginRight: 10 }}>{item}</span>
            </li>
            <Divider />
          </>
        ))}
      </ul>
    </Modal>
  );
};

export default CollapseContentModal;
