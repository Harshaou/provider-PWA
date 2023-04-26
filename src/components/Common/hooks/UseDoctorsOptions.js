import DocData from '../../../utils/doctors.json';

const UseDoctorsOptions = (e, setDoctorsOptions) => {
  const options = DocData.filter((val) => val.Name.toLowerCase().includes(e.toLowerCase())).map(
    (val) => {
      return { label: val.Name, value: val.Name };
    },
  );

  setDoctorsOptions(options);
};

export default UseDoctorsOptions;
