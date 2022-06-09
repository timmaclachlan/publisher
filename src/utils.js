import { format, endOfQuarter } from "date-fns";

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
  if (dateString !== null) {
    let date = Date.parse(dateString);
    return new Intl.DateTimeFormat('en-GB').format(date);
  }
  return "";
}

export const getDatabaseDate = (date) => {
  return format(date, "yyyy-MM-dd");
}

export const getQuarterDates = (quarterWithYear) => {
  //const year = quarterWithYear.substr(1, 4);
  //const qtr = quarterWithYear.substr(0, 1);
  //const startDate = new Date(year, (qtr - 1) * 3, 1);
  //const endDate = endOfQuarter(startDate);
  //return {startDate: getDatabaseDate(startDate), endDate: getDatabaseDate(endDate)}
  return quarterWithYear;
}

export const getFormattedCurrency = (amount) => {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
}

export const getRemainingPercentage = (amount) => {
  return 100 - amount;
}

export const toggleFavorite = (id, type, title) => {
  let currentItems = getFavorites();
  const index = getFavoriteIndex(id);
  debugger;
  if (index === -1) {
    currentItems.push({ id, type, title });
  }
  else {
    currentItems = currentItems.filter((value, i) => i !== index);
  }
  localStorage.setItem("favorites", JSON.stringify(currentItems.length > 0 ? currentItems : []));
}

const getFavoriteIndex = (id) => {
  let currentItems = getFavorites();
  const index = currentItems.findIndex(item => item.id === id);
  return index;
}

export const isFavorite = (id) => {  
  return getFavoriteIndex(id) > -1;
}

export const getFavorites = () => {
  const items = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
  return items;
}