import Axios from 'axios';
const url = `${process.env.BASE_API_URL}/movements`;
export const getMovementsList = (id) =>
  Axios.get(url, { params: { accountId: id } }).then(({ data }) => data);
