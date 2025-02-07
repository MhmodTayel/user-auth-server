import { IsEmail, IsString, IsStrongPassword, Matches } from 'class-validator';

export class RegisterDto {
  private static readonly PASSWORD_ERROR_MSG =
    'Password must be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, one number, and one special character.';

  private static readonly NAME_REGEX = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;
  private static readonly NAME_ERROR_MSG =
    'Name must only contain letters and spaces. Consecutive spaces or numbers are not allowed.';

  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email: string;

  @IsStrongPassword(
    { minLength: 8, minNumbers: 1, minSymbols: 1, minLowercase: 1, minUppercase: 1 },
    { message: RegisterDto.PASSWORD_ERROR_MSG }
  )
  password: string;

  @IsString({ message: 'Name must be a text value.' })
  @Matches(RegisterDto.NAME_REGEX, { message: RegisterDto.NAME_ERROR_MSG })
  name: string;
}
