import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const VisitSearch = ({ handleOnChange, placeholder }) => {
    return (
        <div style={{ display: 'flex', width: '55%', marginLeft: 5 }}>
            <Input
                allowClear
                onChange={(e) => handleOnChange(e.target.value)}
                placeholder={
                    placeholder
                        ? placeholder
                        : 'Search Visit'
                }
                prefix={<SearchOutlined style={{ fontSize: 21, marginLeft: 10 }} />}
                className="ant-input-affix-wrapper-focused customAntInput"
            />
        </div>
    );
};

export default VisitSearch;
