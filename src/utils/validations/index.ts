import { FormValues } from 'components/FormSignUp';
import Joi from 'joi';

const fieldValidations = {
  username: Joi.string().min(5).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'confirmed password does not match with password' })
};

export type FieldErrors = Omit<FormValues, 'showPassword'>;
export type FormFields = Omit<FormValues, 'showPassword'>;
type Field = {
  [field in 'username' | 'password']: string;
};
function getFieldErrors(objError: Joi.ValidationResult) {
  const errors = {} as FieldErrors;
  /** Sample error details
 * [
    {
        "message": "\"username\" length must be at least 5 characters long",
        "path": [
            "username"
        ],
        "type": "string.min",
        "context": {
            "limit": 5,
            "value": "123",
            "label": "username",
            "key": "username"
        }
    },
   ...
]
 */
  if (objError.error) {
    objError.error.details.forEach((err) => {
      const errorField = err.path.join('.') as keyof FieldErrors;
      errors[errorField] = err.message;
    });
  }

  return errors;
}

export function signUpValidate(values: FormFields) {
  const schema = Joi.object(fieldValidations);
  return getFieldErrors(schema.validate(values, { abortEarly: false }));
}

export function validateField(field: keyof FormFields, value: string) {
  const fieldValidation = { [field]: fieldValidations[field] };
  const schema = Joi.object(fieldValidation);

  const { error } = schema.validate({ [field]: value });
  console.log('field', field, 'error', error);
  if (!error) return {};

  const fieldError = {} as FieldErrors;
  return { ...fieldError, [field]: error?.message };
}
