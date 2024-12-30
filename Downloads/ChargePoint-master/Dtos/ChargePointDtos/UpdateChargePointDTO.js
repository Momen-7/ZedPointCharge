// UpdateChargePointDTO.js
export default class UpdateChargePointDTO {
  constructor(
    chargePointId,
    location,
    status,
    pricePerKWh,
    speedOfCharging,
    minChargeTime,
    maxChargeTime,
    availableTime
  ) {
    this.chargePointId = chargePointId;
    this.location = location;
    this.status = status;
    this.pricePerKWh = pricePerKWh;
    this.speedOfCharging = speedOfCharging;
    this.minChargeTime = minChargeTime;
    this.maxChargeTime = maxChargeTime;
    this.availableTime = availableTime;
  }
}
