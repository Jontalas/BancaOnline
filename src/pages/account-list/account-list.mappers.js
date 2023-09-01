export const mapAccountListApiToVm = (accountList) =>
  Array.isArray(accountList)
    ? accountList.map((account) => mapAccountApiToVm(account))
    : [];
const mapAccountApiToVm = (account) => ({
  id: account.id,
  iban: account.iban,
  name: account.name,
  balance: `${account.balance} €`,
  lastTransaction: new Date(account.lastTransaction).toLocaleDateString(),
});
