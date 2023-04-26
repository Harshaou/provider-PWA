export const checkUppercaseAndNumb = (str) => {
  if (/[^a-zA-Z]/.test(str) && str !== str.toLowerCase()) {
    return true;
  } else {
    return false;
  }
};
