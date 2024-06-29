import { IsEmail, IsString, IsStrongPassword, Matches } from 'class-validator';

const errorMessages = {
  email: 'Email is invalid',
  password:
    'The password must be at least 8 characters long and include at least one letter, one number, and one special character.',
  name: 'Name is invalid',
};

export class RegisterDto {
  @IsString()
  @Matches(/^[a-zA-Z]+(\s([a-zA-Z]+\s)*[a-zA-Z]+)?$/, {
    message: errorMessages.name,
  })
  name: string;

  @IsEmail({}, { message: errorMessages.email })
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
      minLowercase: 0,
      minUppercase: 0,
    },
    {
      message: errorMessages.password,
    },
  )
  @Matches(/[a-zA-Z]+/, {
    message: errorMessages.password,
  })
  password: string;
}

export class LoginDto {
  @IsEmail({}, { message: errorMessages.email })
  email: string;

  @IsString({ message: 'password is required' })
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
      minLowercase: 0,
      minUppercase: 0,
    },
    {
      message: errorMessages.password,
    },
  )
  @Matches(/[a-zA-Z]+/, {
    message: errorMessages.password,
  })
  password: string;
}
