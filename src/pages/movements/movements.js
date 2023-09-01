import { getMovementsList } from './movements.api';
import { getAccount } from '../account/account.api';
import { mapMovementsListApiToVm, mapAccountApiToVm } from './movements.mapper';
import { addMovementRows } from './movements.helpers';
import { onSetValues } from '../../common/helpers';
import { history } from '../../core/router';

const params = history.getParams();
const accountId = params.id;
const isAccount = Boolean(accountId);

if (isAccount) {
  getAccount(accountId).then((apiAccount) => {
    const account = mapAccountApiToVm(apiAccount);
    onSetValues(account);
  });
}

getMovementsList(accountId).then((apiMovementsList) => {
  const movementsList = mapMovementsListApiToVm(apiMovementsList);
  addMovementRows(movementsList);
});
