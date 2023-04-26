import { HiOutlineDocumentText } from 'react-icons/hi';

const DocView = ({ docs, setIsDocVisible, setCurrentDocs }) => {
  const handleViewAll = (e) => {
    setCurrentDocs(docs);
    setIsDocVisible(true);
  };
  return (
    <div
      id="documentCell"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        cursor: 'pointer',
      }}
      onClick={(e) => handleViewAll(e)}
    >
      <HiOutlineDocumentText size={20} color="#f87d4e" />
      View All
    </div>
  );
};

export default DocView;
