import { format, parse, endOfQuarter, intervalToDuration } from "date-fns";

export const isEmptyObject = (value) => {
  return (
    value && value.constructor === Object && Object.keys(value).length === 0
  );
};

// levelup.gitconnected.com/how-to-select-specific-properties-from-an-array-of-objects-bd9f6c15dbd0
export const selectProps = (...props) => {
  return function (obj) {
    const newObj = {};
    props.forEach((name) => {
      newObj[name] = obj[name];
    });
    return newObj;
  };
};

export const getFormattedDate = (dateString) => {
  if (dateString !== null) {
    try {
      if (dateString.indexOf(" ") > -1) {
        dateString = dateString.substr(0, 10);
      }
      let date = parse(dateString, "yyyy-MM-dd", new Date());
      return new Intl.DateTimeFormat("en-GB").format(date);
    } catch (error) {
      console.log("ERROR: DateString not convertable:" + dateString);
    }
  }
  return "";
};

export const getDatabaseDate = (date) => {
  return format(date, "yyyy-MM-dd");
};

export const getQuarterDates = (quarterWithYear) => {
  //const year = quarterWithYear.substr(1, 4);
  //const qtr = quarterWithYear.substr(0, 1);
  //const startDate = new Date(year, (qtr - 1) * 3, 1);
  //const endDate = endOfQuarter(startDate);
  //return {startDate: getDatabaseDate(startDate), endDate: getDatabaseDate(endDate)}
  return quarterWithYear;
};

export const getCurrentQuarterYear = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const quarter = Math.round(currentMonth / 3);

  return {
    quarter,
    year: currentYear,
  };
};

export const getNextQuarterYear = () => {
  const currentQuarterYear = getCurrentQuarterYear();
  if (currentQuarterYear.quarter < 4) currentQuarterYear.quarter += 1;
  else {
    currentQuarterYear.quarter = 1;
    currentQuarterYear.year += 1;
  }

  return currentQuarterYear;
};

export const getQuarterListForDisplay = () => {
  let currentQuarter = getCurrentQuarterYear();

  let quarters = [];
  for (let y = currentQuarter.year; y >= 2015; y--) {
    for (let q = 3; q >= 1; q--) {
      if (y === currentQuarter.year && q > currentQuarter.quarter) continue;
      quarters.push({
        value: `${q}${y}`,
        label: `Quarter ${q + 1} - ${y}`,
      });
    }
  }
  quarters.push({ value: "02012-2014", label: "2012 - 2014" });
  return quarters;
};

export const convertQuarterStringToDisplay = (quarterString) => {
  if (quarterString.includes("-")) {
    const split = quarterString.split("-");
    return `${split[0].substr(1)} to ${split[1]}`;
  }
  return `${quarterString.substr(1)} Q${
    parseInt(quarterString.substr(0, 1)) + 1
  }`;
};

export const getFormattedCurrency = (amount) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
};

export const getRemainingPercentage = (amount) => {
  if (amount) return 100 - amount;
  return 35;
};

export const toggleFavorite = (id, type, title) => {
  let currentItems = getFavorites();
  const index = getFavoriteIndex(id);
  debugger;
  if (index === -1) {
    currentItems.push({ id, type, title });
  } else {
    currentItems = currentItems.filter((value, i) => i !== index);
  }
  localStorage.setItem(
    "favorites",
    JSON.stringify(currentItems.length > 0 ? currentItems : [])
  );
};

const getFavoriteIndex = (id) => {
  let currentItems = getFavorites();
  const index = currentItems.findIndex((item) => item.id === id);
  return index;
};

export const isFavorite = (id) => {
  return getFavoriteIndex(id) > -1;
};

export const getFavorites = () => {
  const items = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [];
  return items;
};
