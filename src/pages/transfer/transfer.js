import {
  onUpdateField,
  onSubmitForm,
  onSetError,
  onSetFormErrors,
} from '../../common/helpers';
import { insertTransfer } from './transfer.api';
import { setAccountOptions } from './transfer.helpers';
import { getAccountList } from '../account-list/account-list.api';
import { formValidation } from './transfer.validations';
import { mapTransferVmToApi } from './transfer.mapper';
import { history } from '../../core/router';

let transfer = {
  alias: '',
  iban: '',
  name: '',
  amount: '',
  concept: '',
  notes: '',
  day: '',
  month: '',
  year: '',
  email: '',
};

const params = history.getParams();
const accountId = params.id;

getAccountList().then((accountList) => {
  transfer.alias = setAccountOptions(accountList, accountId).value;
});

onUpdateField('select-account', (event) => {
  const value = event.target.value;
  transfer = { ...transfer, alias: value };
});

onUpdateField('iban', (event) => {
  const value = event.target.value;
  transfer = { ...transfer, iban: value };

  formValidation.validateField('iban', transfer.iban).then((result) => {
    onSetError('iban', result);
  });
});

onUpdateField('name', (event) => {
  const value = event.target.value;
  transfer = { ...transfer, name: value };

  formValidation.validateField('name', transfer.name).then((result) => {
    onSetError('name', result);
  });
});

onUpdateField('amount', (event) => {
  const value = event.target.value;
  transfer = { ...transfer, amount: value };

  formValidation.validateField('amount', transfer.amount).then((result) => {
    onSetError('amount', result);
  });
});

onUpdateField('concept', (event) => {
  const value = event.target.value;
  transfer = { ...transfer, concept: value };
});

onUpdateField('notes', (event) => {
  const value = event.target.value;
  transfer = { ...transfer, notes: value };
});

onUpdateField('day', (event) => {
  const value = event.target.value;
  transfer = { ...transfer, day: value };

  formValidation.validateField('day', transfer.day).then((result) => {
    onSetError('date', result);
    if (result.succeeded) {
      checkValidTransferDate();
    }
  });
});

onUpdateField('month', (event) => {
  const value = event.target.value;
  transfer = { ...transfer, month: value };

  formValidation.validateField('month', transfer.month).then((result) => {
    onSetError('date', result);
    if (result.succeeded) {
      checkValidTransferDate();
    }
  });
});

onUpdateField('year', (event) => {
  const value = event.target.value;
  transfer = { ...transfer, year: value };

  formValidation.validateField('year', transfer.year).then((result) => {
    onSetError('date', result);
    if (result.succeeded) {
      checkValidTransferDate();
    }
  });
});

onUpdateField('email', (event) => {
  const value = event.target.value;
  transfer = { ...transfer, email: value };

  formValidation.validateField('email', transfer.email).then((result) => {
    onSetError('email', result);
  });
});

const checkValidTransferDate = () => {
  let showError = false;
  if (
    (transfer.year !== '' || transfer.month !== '' || transfer.day !== '') &&
    (transfer.year === '' || transfer.month === '' || transfer.day === '')
  ) {
    showError = true;
    const result = {
      succeeded: false,
      message: 'Fecha no válida',
    };
    onSetError('date', result);
  } else if (transfer.year !== '') {
    const dateString = `${transfer.year}/${transfer.month}/${transfer.day}`;
    const date = new Date(dateString);
    showError = isNaN(date);
    if (showError) {
      const result = {
        succeeded: false,
        message: 'Fecha no válida',
      };
      onSetError('date', result);
    } else {
      const today = new Date();
      const todayYear = today.getFullYear();
      const todayMonth = today.getMonth();
      const todayDay = today.getDate();
      const dateYear = date.getFullYear();
      const dateMonth = date.getMonth();
      const dateDay = date.getDate();
      if (
        todayYear > dateYear ||
        (todayYear === dateYear && todayMonth > dateMonth) ||
        (todayYear === dateYear &&
          todayMonth === dateMonth &&
          todayDay > dateDay)
      ) {
        showError = true;
        const result = {
          succeeded: false,
          message: 'Fecha ya pasada',
        };
        onSetError('date', result);
      }
    }
  }
  return !showError;
};

const onSave = () => {
  const formattedTransfer = mapTransferVmToApi(transfer);
  return insertTransfer(formattedTransfer);
};

onSubmitForm('transfer-button', () => {
  if (checkValidTransferDate()) {
    formValidation.validateForm(transfer).then((result) => {
      onSetFormErrors(result);
      if (result.succeeded) {
        onSave().then(() => {
          history.back();
        });
      }
    });
  }
});
