import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  Platform, //to use navigator 
} from "react-native";
import Mapbox, { Camera, LocationPuck, MapView } from "@rnmapbox/maps";
import { ContextUser } from "../../context/ContextProvider";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking"; // to linked app with navigator 

Mapbox.setAccessToken(
  "pk.eyJ1IjoibWFobW91ZGZhdGh5MTk5NyIsImEiOiJjbHo5eXJ3ZTcwaTFwMmpzYWVtdTdpdXZpIn0._dZq4rTZ7u7BTZ4uXryATw"
);

const Map = () => {
  const [model_charge, setModelCharge] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [mapFilters, setMapFilters] = useState({});  // Add any filter states here
  
  const mapRef = useRef();
  const cameraRef = useRef();

  const {
    chargePoint,
    location,
    handlerLocations,
    current_location,
    setCurrentLocation,
  } = useContext(ContextUser);

  // Location User
  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      handlerLocations(location);
      setCurrentLocation(location);
    }

    getCurrentLocation();
  }, []);

  const handlerResetLocation = async () => {
    // Reset any filters or states
    setMapFilters({});
    setModelCharge(null);
    
    // Animate camera to current location
    if (current_location?.coords) {
      cameraRef.current?.setCamera({
        centerCoordinate: [
          current_location.coords.longitude,
          current_location.coords.latitude,
        ],
        zoomLevel: 15,
        animationDuration: 1000,
      });
    } else {
      // If current_location is not available, get it again
      try {
        const location = await Location.getCurrentPositionAsync({});
        handlerLocations(location);
        setCurrentLocation(location);
        
        cameraRef.current?.setCamera({
          centerCoordinate: [
            location.coords.longitude,
            location.coords.latitude,
          ],
          zoomLevel: 15,
          animationDuration: 1000,
        });
      } catch (error) {
        setErrorMsg("Could not get current location");
      }
    }
  };

  // function to navigate to charge point 
  const handleNavigate = (destinationLat, destinationLon) => {
    const url = Platform.select({
      ios: `maps:0,0?q=${destinationLat},${destinationLon}`,
      android: `google.navigation:q=${destinationLat},${destinationLon}`,
    });
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {location?.coords?.latitude && location?.coords?.longitude ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          styleURL={"mapbox://styles/mapbox/streets-v12"}
          logoEnabled={false}
          compassEnabled={true}
          compassPosition={{ top: 60, right: 8 }}
          scaleBarEnabled={false}
        >
          <Camera
            ref={cameraRef}
            animationMode={"flyTo"}
            animationDuration={3000}
            centerCoordinate={[
              Number(location?.coords?.longitude) || 0,
              Number(location?.coords?.latitude) || 0,
            ]}
            zoomLevel={10}
            minZoomLevel={5}
            maxZoomLevel={20}
            allowUpdates={true}
          />
          <LocationPuck
            puckBearingEnabled
            puckBearing="heading"
            pulsing={{ isEnabled: true }}
          />

          {chargePoint?.length > 0 &&
            chargePoint?.map((charge, index) => (
              <Mapbox.PointAnnotation
                key={charge?.id.toString()}
                id={`marker${index}`}
                coordinate={[
                  Number(charge?.data?.long) || 0,
                  Number(charge?.data?.lat) || 0,
                ]}
                onSelected={(e) => setModelCharge(charge)}
              >
                <Mapbox.Callout
                  title={charge?.data?.name}
                  key={charge?.id.toString()}
                  id={charge?.id.toString()}
                />
              </Mapbox.PointAnnotation>
            ))}
        </MapView>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>Loading...</Text>
        </View>
      )}

      <View style={styles.myLocation}>
        <TouchableOpacity
          onPress={handlerResetLocation}
          style={styles.ButtonmyLocation}
          activeOpacity={0.7}
        >
          <MaterialIcons name="my-location" size={25} color="#0066CC" />
        </TouchableOpacity>
      </View>

      {errorMsg ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      ) : null}

      {model_charge?.id && (
        <Modal
          animationType="slide"
          visible={true}
          onDismiss={() => setModelCharge(null)}
          onRequestClose={() => setModelCharge(null)}
        >
          <Text style={styles.title}>Details Charge Point</Text>
          <View style={styles.modal}>
            <Text style={styles.modalText}>
              Name:{" "}
              <Text style={styles.modalSubText}>
                {model_charge?.data?.name}
              </Text>
            </Text>
            <Text style={styles.modalText}>
              Price:{" "}
              <Text style={styles.modalSubText}>
                {model_charge?.data?.price||"Not specified"}
              </Text>
            </Text>
            <Text style={styles.modalText}>
              Latitude:{" "}
              <Text style={styles.modalSubText}>{model_charge?.data?.lat}</Text>
            </Text>
            <Text style={styles.modalText}>
              Longitude:{" "}
              <Text style={styles.modalSubText}>
                {model_charge?.data?.long}
              </Text>
            </Text>
            <Text style={styles.modalText}>
              Country:{" "}
              <Text style={styles.modalSubText}>
                {model_charge?.data?.country||"Not specified"}
              </Text>
            </Text>
            <Text style={styles.modalText}>
              Status:{" "}
              <Text style={styles.modalSubText}>
                {model_charge?.data?.status||"Not specified"}
              </Text>
            </Text>
            <Text style={styles.modalText}>
              Type of Charger:{" "}
              <Text style={styles.modalSubText}>
                {model_charge?.data?.TypeOfCharger||"Not specified"}
              </Text>
            </Text>
          
            

            {}
            <TouchableOpacity
              onPress={() =>
                handleNavigate(
                  model_charge?.data?.lat,
                  model_charge?.data?.long
                )
              }
              style={styles.navigateButton}
            >
              <Text style={styles.navigateButtonText}>Navigate</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  title: {
    textAlign: "center",
    color: "#333",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  modal: {
    marginVertical: 20,
    padding: 20,
    gap: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    letterSpacing: 0.5,
  },
  modalSubText: {
    fontSize: 16,
    color: "#555",
    letterSpacing: 0.5,
    fontWeight: "normal",
  },
  myLocation: {
    position: "absolute",
    top: 8,
    right: 10,
    zIndex: 1000,
  },
  ButtonmyLocation: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  errorContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
  },
  navigateButton: {
    backgroundColor: "#0066CC",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  navigateButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Map;
