exports.validateData = data => {
  const regex = /^[a-z][a-z\s]*$/;
  return regex.test(data);
};
