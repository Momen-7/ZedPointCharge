class User {
  constructor(
    username,
    fullName,
    email,
    phone,
    profileImage,
    country,
    rates = {},
    chargePoints = []
  ) {
    this.username = username;
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.profileImage = profileImage;
    this.country = country;
    this.rates = rates; // Example: { "charger1": 4.5, "charger2": 3.8 }
    this.chargePoints = chargePoints; // List of ChargePoint objects
  }
}
