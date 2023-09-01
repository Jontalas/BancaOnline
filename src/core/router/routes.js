const baseRoutes = {
  login: '/pages/login/login.html',
  accountList: '/pages/account-list/account-list.html',
  account: '/pages/account/account.html',
  movements: '/pages/movements/movements.html',
  transfer: '/pages/transfer/transfer.html',
};

export const routes = {
  ...baseRoutes,
  account: id => (id ? `${baseRoutes.account}?id=${id}` : baseRoutes.account),
  movements: id =>
    id ? `${baseRoutes.movements}?id=${id}` : baseRoutes.movements,
  transfer: id =>
    id ? `${baseRoutes.transfer}?id=${id}` : baseRoutes.transfer,
};
