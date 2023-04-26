import ICDdata from '../../../utils/ICD.json';

const UseIcdOptions = (e, setIcdOptions) => {
  const options = ICDdata.filter((val) => val.desc.toLowerCase().includes(e.toLowerCase())).map(
    (val) => {
      return { label: val.desc, value: val.desc };
    },
  );
  setIcdOptions(options);
};

export default UseIcdOptions;
