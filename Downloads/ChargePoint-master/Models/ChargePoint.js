class ChargePoint {
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
    this.speedOfCharging = speedOfCharging; // Speed of charging in kW (e.g., 50 kW)
    this.minChargeTime = minChargeTime; // Minimum charge time in minutes (e.g., 30 minutes)
    this.maxChargeTime = maxChargeTime; // Maximum charge time in minutes (e.g., 120 minutes)
    this.availableTime = availableTime; // Available time in hours (e.g., "09:00 AM - 06:00 PM")
  }
}
