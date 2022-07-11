export const rowsPerPage = 10;

export const randomNumber = () => {
  return 1000 + Math.trunc(Math.random() * 9000);
};

export const totalRowsPerPage = (arrayPage) => {
  return Math.ceil(arrayPage.length / rowsPerPage);
};

export const arrayRowsPerPage = (arrayPage, page) => {
  return arrayPage.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};
