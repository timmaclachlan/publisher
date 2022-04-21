export const isEmptyObject = (value) => {
  return value && value.constructor === Object && Object.keys(value).length === 0;
}
