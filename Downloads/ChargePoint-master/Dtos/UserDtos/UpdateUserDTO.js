export default class UpdateUserDTO {
  constructor(username, fullName, email, phone, location) {
    this.username = username;
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.location = location;
  }
}
