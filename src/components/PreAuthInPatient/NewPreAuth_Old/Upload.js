import React, { useEffect, useState } from 'react';
import { Upload, Checkbox } from 'antd';
import UploadImg from '../../../img/upload.png';
import styles from '../index.module.css';

const DraggerComponent = ({ setFiles, disabled, fileCount }) => {
  const [fileList, setFileList] = useState([]);

  const { Dragger } = Upload;

  useEffect(() => {
    setFileList([]);
  }, [disabled]);

  const handleChange = async ({ fileList }) => {
    setFileList(fileList.filter((file) => file.status !== 'error'));

    if (fileList.length > 0) {
      var docs = [];
      try {
        await Promise.all(
          fileList.map(async (file, index) => {
            try {
              docs.push(file.originFileObj);
              if (fileList.length - 1 == index) {
                setFiles(docs);
              }
            } catch (e) {
              console.log(e);
            }
          }),
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onRemove = async (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
    setFiles(newFileList);
  };

  return (
    <Dragger
      disabled={disabled}
      fileList={fileList}
      beforeUpload={() => false}
      onChange={handleChange}
      onRemove={onRemove}
      multiple={true}
      maxCount={fileCount}
      accept=".doc,.docx,.pdf,.csv,.xlsx, .xls,"
      className={fileList !== null && fileList.length > fileCount ? styles.blocked : undefined}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 15,
          paddingLeft: 15,
          paddingRight: 15,
          height: 10,
        }}
      >
        <img style={{ height: 25 }} src={UploadImg} alt="UploadImg" />
        <div>
          <h5 className="mbZero" style={{ fontWeight: 700 }}>
            Browse to upload
          </h5>
          <p style={{ color: '#f87d4e', fontSize: 10, textAlign: 'start' }}>Or Drag and Drop</p>
        </div>
        <Checkbox checked={fileList.length > 0}></Checkbox>
      </div>
    </Dragger>
  );
};

export default DraggerComponent;
