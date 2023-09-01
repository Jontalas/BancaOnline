import { Validators, createFormValidation } from '@lemoncode/fonk';
const validationSchema = {
  field: {
    iban: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: Validators.pattern,
        message: 'IBAN no válido',
        customArgs: { pattern: '^[E][S][0-9]{2}[0-9]{20}$' },
      },
    ],
    name: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    amount: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: Validators.pattern,
        message: 'Importe no válido',
        customArgs: { pattern: '^[1-9][0-9]*(\.[0-9]{1,2})?$' },
      },
    ],
    day: [
      {
        validator: Validators.pattern,
        message: 'Día no válido',
        customArgs: { pattern: '^([1-9][0-9]|[1-9])$' },
      },
    ],
    month: [
      {
        validator: Validators.pattern,
        message: 'Mes no válido',
        customArgs: { pattern: '^([1-9][0-9]|[1-9])$' },
      },
    ],
    year: [
      {
        validator: Validators.pattern,
        message: 'Año no válido',
        customArgs: { pattern: '^[1-9][0-9]{3}$' },
      },
    ],
    email: [
      {
        validator: Validators.email,
        message: 'Email no válido',
      },
    ],
  },
};
export const formValidation = createFormValidation(validationSchema);