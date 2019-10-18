export const formatMoney = value => {
  return parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
};

export const formatBrDate = date => {
  const splited = date.split('-');
  return `${splited[2]}/${splited[1]}/${splited[0]}`;
}

export const dateToString = date => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}