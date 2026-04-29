import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsPasswordValidConstraint implements ValidatorConstraintInterface {
  validate(password: string) {
    if (!password || typeof password !== 'string') {
      return false;
    }

    // Minimum 8 caractères, au moins 1 lettre, 1 chiffre
    const hasMinLength = password.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return hasMinLength && hasLetter && hasNumber;
  }

  defaultMessage() {
    return 'Le mot de passe doit contenir au moins 8 caractères, dont une lettre et un chiffre';
  }
}

export function IsPasswordValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPasswordValidConstraint,
    });
  };
}
