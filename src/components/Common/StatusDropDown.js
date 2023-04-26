import { Divider } from 'antd';
import ColorRound from './ColorRound';

const DropDown = ({ setFilter, setPage, statusArr }) => {
  const handleClick = (text) => {
    setFilter(text);
    setPage(0);
  };
  return (
    <div
      style={{
        padding: 10,
        marginLeft: 10,
        marginTop: 15,
        marginBottom: 15,
        cursor: 'pointer',
      }}
    >
      {statusArr?.map((item, index) => (
        <>
          <div
            key={index}
            onClick={() => handleClick(item.text)}
            style={{ display: 'flex', alignItems: 'center', gap: 5 }}
          >
            <ColorRound color={item.color} />
            <p className="mbZero">{item.text}</p>
          </div>
          {statusArr.length - 1 !== index && <Divider />}
        </>
      ))}
    </div>
  );
};

export default DropDown;
