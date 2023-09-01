import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    type: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    alias: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
