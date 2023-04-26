import { Modal } from 'antd';
import CloseModalImg from '../../../img/close-modal.png';
import { HiOutlineDocumentText } from 'react-icons/hi';

const ViewDocsModal = ({ isDocVisible, setIsDocVisible, docs }) => {
  const render = (docs, key) => {
    if (key === 'misc') {
      return (
        <div
          style={{
            display: 'flex',
            gap: 30,
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          {docs[key]?.map((item, index) => (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              <HiOutlineDocumentText size={40} color="#f87d4e" />
              <p style={{ fontSize: 8, marginBottom: 0 }}>{item.file_name}</p>
            </a>
          ))}
        </div>
      );
    } else {
      return (
        <a
          href={docs[key].url}
          target="_blank"
          rel="noopener noreferrer"
          key={docs[key].url}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <HiOutlineDocumentText size={40} color="#f87d4e" />
          <p style={{ fontSize: 8, marginBottom: 0 }}>{docs[key].file_name}</p>
        </a>
      );
    }
  };

  return (
    <>
      <Modal className="viewDocs" bodyStyle={{ padding: 50 }} footer={null} visible={isDocVisible}>
        <div
          onClick={() => setIsDocVisible(false)}
          style={{ cursor: 'pointer' }}
          className="modalCloseIcon"
        >
          <img src={CloseModalImg} style={{ width: 28 }} alt="" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 35 }}>
          <div>
            <h1 className="mbZero">View all documents</h1>
            <h5 className="mbZero">Please click on document to open</h5>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 50,
              flexWrap: 'wrap',
            }}
          >
            {Object.keys(docs).map((key) => (
              <div key={key}>
                <p
                  style={{
                    textTransform: 'capitalize',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  {key.replace('_', ' ')}
                </p>
                {render(docs, key)}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewDocsModal;
