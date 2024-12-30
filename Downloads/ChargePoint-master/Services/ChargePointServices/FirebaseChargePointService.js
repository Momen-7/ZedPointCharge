// firebaseChargePointService.js
import database from "@react-native-firebase/database";

class FirebaseChargePointService {
  static async createChargePoint(createChargePointDTO) {
    const {
      location,
      status,
      pricePerKWh,
      ownerId,
      speedOfCharging,
      minChargeTime,
      maxChargeTime,
      availableTime,
    } = createChargePointDTO;

    if (!location || !status || !pricePerKWh || !ownerId || !speedOfCharging) {
      return { success: false, message: "Missing required fields." };
    }

    try {
      const newRef = database().ref("chargePoints").push();
      const chargePointId = newRef.key;

      await newRef.set({
        id: chargePointId,
        location,
        status,
        pricePerKWh,
        ownerId,
        speedOfCharging,
        minChargeTime,
        maxChargeTime,
        availableTime,
      });

      return {
        success: true,
        message: "Charge point created successfully.",
        id: chargePointId,
        ...createChargePointDTO,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async getChargePoint(getChargePointDTO) {
    const { chargePointId } = getChargePointDTO;

    if (!chargePointId) {
      return { success: false, message: "Missing chargePointId." };
    }

    try {
      const chargePointSnapshot = await database()
        .ref(`chargePoints/${chargePointId}`)
        .once("value");

      if (!chargePointSnapshot.exists()) {
        return { success: false, message: "Charge point not found." };
      }

      return {
        success: true,
        message: "Charge point retrieved successfully.",
        data: { id: chargePointId, ...chargePointSnapshot.val() },
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async updateChargePoint(updateChargePointDTO) {
    const { chargePointId, ...updates } = updateChargePointDTO;

    if (!chargePointId || Object.keys(updates).length === 0) {
      return { success: false, message: "Missing chargePointId or updates." };
    }

    const chargePointRef = database().ref(`chargePoints/${chargePointId}`);
    const chargePointSnapshot = await chargePointRef.once("value");

    if (!chargePointSnapshot.exists()) {
      return { success: false, message: "Charge point not found." };
    }

    try {
      await chargePointRef.update(updates);
      return {
        success: true,
        message: "Charge point updated successfully.",
        id: chargePointId,
        ...updates,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async getAllChargePoints() {
    try {
      const snapshot = await database().ref("chargePoints").once("value");

      if (!snapshot.exists()) {
        return { success: true, message: "No charge points found.", data: [] };
      }

      const chargePoints = [];
      snapshot.forEach((childSnapshot) => {
        chargePoints.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });

      return {
        success: true,
        message: "Charge points retrieved successfully.",
        data: chargePoints,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async deleteChargePoint(chargePointId) {
    if (!chargePointId) {
      return { success: false, message: "Missing chargePointId." };
    }

    const chargePointRef = database().ref(`chargePoints/${chargePointId}`);
    const chargePointSnapshot = await chargePointRef.once("value");

    if (!chargePointSnapshot.exists()) {
      return { success: false, message: "Charge point not found." };
    }

    try {
      await chargePointRef.remove();
      return {
        success: true,
        message: "Charge point deleted successfully.",
        id: chargePointId,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default FirebaseChargePointService;
