// CreateChargePointDTO.js
export default class CreateChargePointDTO {
  constructor(
    location,
    status,
    pricePerKWh,
    ownerId,
    speedOfCharging,
    minChargeTime,
    maxChargeTime,
    availableTime
  ) {
    this.location = location;
    this.status = status; // Example: 'available', 'occupied'
    this.pricePerKWh = pricePerKWh;
    this.ownerId = ownerId; // User ID of the charge point owner
    this.speedOfCharging = speedOfCharging; // Speed of charging in kW
    this.minChargeTime = minChargeTime; // Minimum charge time in minutes
    this.maxChargeTime = maxChargeTime; // Maximum charge time in minutes
    this.availableTime = availableTime; // Available time in hours
  }
}
