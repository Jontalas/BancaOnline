import { routes } from '../../core/router';

const getOptions = id => {
  const emptyOption = document.createElement('option');
  const transferOption = document.createElement('option');
  transferOption.textContent = 'Transferencias';
  transferOption.value = routes.transfer(id);
  const movementOption = document.createElement('option');
  movementOption.textContent = 'Movimientos';
  movementOption.value = routes.movements(id);

  const select = document.createElement('select');
  select.classList.add('select');
  select.id = `select-${id}`;
  select.appendChild(emptyOption);
  select.appendChild(transferOption);
  select.appendChild(movementOption);

  return select;
};

const getAccountRow = account => {
  const ibanAnchor = document.createElement('a');
  ibanAnchor.href = routes.account(account.id);
  ibanAnchor.textContent = account.iban;
  const ibanCell = document.createElement('td');
  ibanCell.classList.add('iban');
  ibanCell.appendChild(ibanAnchor);

  const nameCell = document.createElement('td');
  nameCell.textContent = account.name;

  const balanceCell = document.createElement('td');
  balanceCell.classList.add('align-right');
  balanceCell.textContent = account.balance;

  const lastTransactionCell = document.createElement('td');
  lastTransactionCell.classList.add('align-right');
  lastTransactionCell.textContent = account.lastTransaction;

  const optionCell = document.createElement('td');
  optionCell.appendChild(getOptions(account.id));

  const row = document.createElement('tr');
  row.appendChild(ibanCell);
  row.appendChild(nameCell);
  row.appendChild(balanceCell);
  row.appendChild(lastTransactionCell);
  row.appendChild(optionCell);
  return row;
};

export const addAccountRows = accountList => {
  accountList.forEach(account => {
    const row = getAccountRow(account);
    const listElement = document.getElementById('account-list');
    listElement.appendChild(row);
  });
};
