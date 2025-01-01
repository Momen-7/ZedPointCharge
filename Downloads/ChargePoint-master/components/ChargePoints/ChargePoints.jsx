import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { Button, TextInput } from "react-native-paper";
import { COLORS } from "./../../constants/COLORS";
import { GETDATA, POSTDATA, UPDATEDATA } from "../../hook/MethodAPI";
import { ContextUser } from "../../context/ContextProvider";

const ChargePoints = ({ onClose, defualtValue, edit }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [timeFormat, setTimeFormat] = useState("AM"); //Add time status

  const { user, handlerChargePoints } = useContext(ContextUser);

  useEffect(() => {
    if (user) setData((prev) => ({ ...prev, ownerId: user.id }));
  }, [user]);

  // defualtValue
  useEffect(() => {
    if (defualtValue) {
      setData((prev) => ({ ...prev, ...defualtValue.data }));
    }
  }, [defualtValue]);

  const handlerChanged = (text, name) => {
    setData({ ...data, [name]: text });
  };

  const handlerSubmit = async () => {
    try {
      if (!data?.name && !data?.lat && !data?.long)
        return Alert.alert("Error", "Please enter a name and lat and long ");

      const charge = await POSTDATA("chargePoints", data);

      if (charge) {
        Alert.alert("Create Charge Point was successfully");
        await GETDATA("chargePoints", handlerChargePoints);
        onClose();
      }
    } catch (err) {
      return Alert.alert("Error", err.message);
    }
  };

  const handlerUpdate = async () => {
    setLoading(true);
    try {
      await UPDATEDATA("chargePoints", data, defualtValue.id);
      Alert.alert("Update Charge Point was successfully");
      await GETDATA("chargePoints", handlerChargePoints);
      onClose();
      setLoading(false);
    } catch (err) {
      Alert.alert("Error", err.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.charge}>
      <TouchableOpacity onPress={onClose} style={{ padding: 10 }}>
        <Ionicons name="arrow-back" size={30} />
      </TouchableOpacity>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Text style={styles.title}>Add Charge Points</Text>
        {/* Add your charge points here */}
        <View style={styles.form}>
          <TextInput
            label="name"
            value={data?.name}
            onChangeText={(text) => handlerChanged(text, "name")}
            style={styles.input}
          />
          <TextInput
            label="Latitude"
            keyboardType="number-pad"
            value={data?.lat}
            onChangeText={(text) => handlerChanged(text, "lat")}
            style={styles.input}
          />
          <TextInput
            label="Longitude"
            keyboardType="number-pad"
            value={data?.long}
            onChangeText={(text) => handlerChanged(text, "long")}
            style={styles.input}
          />
          <TextInput
            label="Country"
            value={data?.country}
            onChangeText={(text) => handlerChanged(text, "country")}
            style={styles.input}
          />
          <TextInput
            label="Status"
            value={data?.status}
            onChangeText={(text) => handlerChanged(text, "status")}
            style={styles.input}
          />
          <TextInput
            label="Type of charger"
            keyboardType="number-pad"
            value={data?.availableTime}
            onChangeText={(text) => handlerChanged(text, "TypeOfCharger")}
            style={styles.input}
          />
          <TextInput
            label="Price"
            keyboardType="number-pad"
            value={data?.price}
            onChangeText={(text) => handlerChanged(text, "price")}
            style={styles.input}
          />
          <TextInput
            label="Speed KW/H"
            value={data?.speed}
            onChangeText={(text) => handlerChanged(text, "speed KW/H")}
            style={styles.input}
          />
          <TextInput
            label="Min Charge Time"
            keyboardType="number-pad"
            value={data?.minChargeTime}
            onChangeText={(text) => handlerChanged(text, "minChargeTime")}
            style={styles.input}
          />
          <TextInput
            label="Max Charge Time"
            keyboardType="number-pad"
            value={data?.maxChargeTime}
            onChangeText={(text) => handlerChanged(text, "maxChargeTime")}
            style={styles.input}
          />
        
          <View style={styles.timeContainer}>
            <TextInput
              label="Available Time"
              keyboardType="number-pad"
              value={data?.availableTime}
              onChangeText={(text) => handlerChanged(text, "availableTime")}
              style={[styles.input, { flex: 1 }]}
            />
            <Button 
              mode="outlined" 
              onPress={() => setTimeFormat((prev) => (prev === "AM" ? "PM" : "AM"))}
              style={styles.timeButton}
            >
              {timeFormat}
            </Button>
          </View>

          <Button
            mode="contained"
            style={{ backgroundColor: COLORS.ACCENT }}
            onPress={edit ? handlerUpdate : handlerSubmit}
          >
            {loading
              ? "Loading"
              : edit
              ? "Update Charge Point"
              : "Add New Charge Point"}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  charge: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#f6f6f6",
    zIndex: 9999999,
  },
  content: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 600,
  },
  form: {
    marginTop: 50,
    marginHorizontal: 20,
    gap: 20,
  },
  input: {
    backgroundColor: COLORS.WHITE,
    color: COLORS.BLACK,
    borderWidth: 1,
    borderColor: "#eee",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  timeButton: {
    marginTop: 10,
  },
});

ChargePoints.propTypes = {
  onClose: PropTypes.func.isRequired,
  defualtValue: PropTypes.object,
  edit: PropTypes.bool,
};

export default ChargePoints;
