import React, { useContext } from "react";
import { Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "./../../constants/COLORS";
import { ContextUser } from "../../context/ContextProvider";

const FilterMap = () => {
  const { location, chargePoint, handlerLocations } = useContext(ContextUser);

  const HandlerNearest = () => {
    let nearestLocation = chargePoint[0]; // Start with the first location
    let smallestDifference =
      Math.abs(location?.coords?.latitude - nearestLocation?.data?.lat) +
      Math.abs(location?.coords?.longitude - nearestLocation?.data?.long);

    // Loop through the array to find the location with the smallest numerical difference
    for (let i = 1; i < chargePoint.length; i++) {
      const latDiff = Math.abs(
        location?.coords?.latitude - chargePoint[i]?.data?.lat
      );
      const longDiff = Math.abs(
        location?.coords?.longitude - chargePoint[i]?.data?.long
      );
      const totalDifference = latDiff + longDiff;

      // Update the nearest location if we find a smaller difference
      if (totalDifference < smallestDifference) {
        nearestLocation = chargePoint[i];
        smallestDifference = totalDifference;
      }
    }

    return handlerLocations({
      coords: {
        latitude: nearestLocation?.data?.lat,
        longitude: nearestLocation?.data?.long,
      },
    });
  };

  const HandlerCheapest = () => {
    // Start by assuming the first price is the cheapest
    let cheapestPrice = chargePoint[0];

    // Loop through the array to find the lowest price
    for (let i = 1; i < chargePoint.length; i++) {
      if (chargePoint[i].data.price < cheapestPrice?.data?.price) {
        cheapestPrice = chargePoint[i];
      }
    }

    return handlerLocations({
      coords: {
        latitude: cheapestPrice?.data?.lat,
        longitude: cheapestPrice?.data?.long,
      },
    });
  };

  return (
    <ScrollView
      horizontal
      style={styles.filter_map}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
        paddingHorizontal: 10,
        gap: 10,
      }}
    >
      <TouchableOpacity style={styles.button} onPress={HandlerNearest}>
        <Text style={styles.buttonText}>Nearest</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={HandlerCheapest}>
        <Text style={styles.buttonText}>Cheapest</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filter_map: {
    width: "60%",
    height: "100%",
  },
  button: {
    backgroundColor: COLORS.TEXT_SECONDARY,
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
    maxWidth: 120,
    marginHorizontal: 5,
    elevation: 1,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontWeight: "bold",
  },
});

export default FilterMap;
