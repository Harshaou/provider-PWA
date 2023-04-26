import React, { useEffect, useState } from "react";
import { CheckCircleTwoTone, WarningTwoTone } from "@ant-design/icons";

const PopOverValidityCheck = ({ value }) => {
  const [letterLength, setLetterLength] = useState();
  const [includeNumber, setIncludeNumber] = useState();
  const [includeUppercase, setIncludeUppercase] = useState();
  const [noRepeatedLetter, setRepeatedLetter] = useState();

  useEffect(() => {
    if (value) {
      if (/[^a-zA-Z]/.test(value)) {
        setIncludeNumber(true);
      } else {
        setIncludeNumber(false);
      }
      if (value.length > 7) {
        setLetterLength(true);
      } else {
        setLetterLength(false);
      }
      if (value !== value?.toLowerCase()) {
        setIncludeUppercase(true);
      } else {
        setIncludeUppercase(false);
      }
      if (isRepeatedLetter(value)) {
        setRepeatedLetter(true);
      } else {
        setRepeatedLetter(false);
      }
    }
  }, [value]);

  let isRepeatedLetter = (str) => {
    str = str.replace(/\s+/g, "_");
    return /(\S)(\1{2,})/g.test(str);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }}
    >
      <div className="dfaCenter">
        {includeNumber ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <WarningTwoTone twoToneColor="red" />
        )}
        <p className="mbZero">Include number</p>
      </div>
      <div className="dfaCenter">
        {includeUppercase ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <WarningTwoTone twoToneColor="red" />
        )}
        <p className="mbZero">Include lowercase & uppercase</p>
      </div>

      <div className="dfaCenter">
        {letterLength ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <WarningTwoTone twoToneColor="red" />
        )}
        <p className="mbZero">8 or more characters</p>
      </div>
      <div className="dfaCenter">
        {noRepeatedLetter ? (
          <WarningTwoTone twoToneColor="red" />
        ) : (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        )}
        <p className="mbZero">No repeated letters</p>
      </div>
    </div>
  );
};

export default PopOverValidityCheck;
