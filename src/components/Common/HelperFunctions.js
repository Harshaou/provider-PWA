import styles from './index.module.css';

export const preventMinus = (event) => {
  if (event.target.value === '' && event.code == 'Digit0') {
    event.preventDefault();
  }
  if (event.code === 'Minus') {
    event.preventDefault();
  }
  if (event.key === 'e') {
    event.preventDefault();
  }
  if (event.key === '+') {
    event.preventDefault();
  }
  if (event.target.value === '' && event.key === '.') {
    event.preventDefault();
  }
};

export const statusDot = (status) => {
  switch (status) {
    case 'Approved':
      return styles.greenRound;
    case 'Declined':
      return styles.pinkRound;
    case 'Received':
      return styles.blueRound;
    case 'In_Progress':
      return styles.violetRound;
    default:
      return styles.defaultRound;
  }
};

export const statusText = (status) => {
  let color = '';

  switch (status) {
    case 'Pending':
      color = '#FFCC00';
      break;
    case 'In_Progress':
      color = '#FF9966';
      break;
    case 'Approved':
      color = '#3AB44D';
      break;
    case 'Declined':
      color = '#EF4444';
      break;
    case ' Information_Required':
      color = '#FF9966';
      break;
    default:
      color = 'black';
      break;
  }

  return color;
};
