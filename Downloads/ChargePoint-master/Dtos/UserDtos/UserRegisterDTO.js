export default class UserRegisterDTO {
  constructor(
    username,
    fullName,
    email,
    phone,
    password,
    confirmPassword,
    country
  ) {
    this.username = username;
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.country = country;
  }
}
