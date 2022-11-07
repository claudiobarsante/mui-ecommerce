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
type FormFields = Omit<FormValues, 'showPassword'>;

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
