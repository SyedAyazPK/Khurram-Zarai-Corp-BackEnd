const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('Please enter a valid "{{#label}}"');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message("password must be at least 8 characters");
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(
      "password must contain at least 1 letter and 1 number"
    );
  }
  return value;
};

const isValidURL = (url, helper) => {
  // console.log("url", url, helper);
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  if (!urlRegex.test(url)) {
    return helper.message(
      `Please add ${
        helper.state.path?.[1] ? helper.state?.path[1] : helper.state?.path[0]
      }`
    );
  }
  return url;
};

module.exports = {
  objectId,
  password,
  isValidURL,
};
