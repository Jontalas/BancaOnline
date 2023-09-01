export const mapAccountVmToApi = (account) => ({
  ...account,
  name: account.alias,
});

export const mapAccountApiToVm = (account) => ({
  ...account,
  alias: account.name,
});
