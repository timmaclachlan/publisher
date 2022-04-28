

export const isEmptyObject = (value) => {
  return value && value.constructor === Object && Object.keys(value).length === 0;
}

// levelup.gitconnected.com/how-to-select-specific-properties-from-an-array-of-objects-bd9f6c15dbd0
export const selectProps = (...props) => {
  return function (obj) {
    const newObj = {};
    props.forEach(name => {
      newObj[name] = obj[name];
    });
    return newObj;
  }
}

export const getFormattedDate = (dateString) => {
  let date = Date.parse(dateString);
  return new Intl.DateTimeFormat('en-GB').format(date);
}

export const getFormattedCurrency = (amount) => {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
}