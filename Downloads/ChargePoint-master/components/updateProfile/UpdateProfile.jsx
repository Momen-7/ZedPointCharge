import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { TextInput } from "react-native-paper";
import { COLORS } from "../../constants/COLORS";
import { GETDATA, UPDATEDATA } from "../../hook/MethodAPI";
import { ContextUser } from "../../context/ContextProvider";

const UpdateProfile = ({ onClose }) => {
  const [data, setData] = useState(null);

  const { user, handlerUsers } = useContext(ContextUser);

  useEffect(() => {
    if (user) setData(user.data);
  }, [user]);

  const handlerChanged = (text, name) => {
    setData({ ...data, [name]: text });
  };

  const onSubmit = async () => {
    try {
      await UPDATEDATA("Users", data, user.id);
      Alert.alert("Update", "Profile Updated Successfully", [
        {
          text: "OK",
          onPress: () => {
            GETDATA("Users", handlerUsers);
            onClose();
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", error.message);
    }

    // onClose();
  };

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={styles.updateProfile}>
      <KeyboardAvoidingView behavior="padding">
        <TouchableOpacity
          onPress={onClose}
          style={{ padding: 10, width: "12%" }}
        >
          <Ionicons name="arrow-back" size={30} />
        </TouchableOpacity>

        {/* <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        > */}
        <View style={styles.form}>
          <TextInput
            label="Name"
            onChangeText={(text) => handlerChanged(text, "fullName")}
            style={styles.input}
            value={data?.fullName}
          />
          <TextInput
            label="Email"
            onChangeText={(text) => handlerChanged(text, "email")}
            style={styles.input}
            value={data?.email}
          />
          <TextInput
            keyboardType="number-pad"
            label="Phone Number"
            onChangeText={(text) => handlerChanged(text, "phoneNumber")}
            style={styles.input}
            value={data?.phoneNumber}
          />
          <TextInput
            label="Country"
            onChangeText={(text) => handlerChanged(text, "country")}
            style={styles.input}
            value={data?.country}
          />

          <View style={styles.Button}>
            <TouchableOpacity style={styles.Save} onPress={onSubmit}>
              <Text style={styles.SaveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* </ScrollView> */}
      </KeyboardAvoidingView>
    </Pressable>
  );
};

UpdateProfile.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  updateProfile: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    zIndex: 9999999,
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
  Button: {
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  Save: {
    backgroundColor: COLORS.SECONDARY,
    padding: 10,
    borderRadius: 5,
    width: "30%",
  },
  SaveText: {
    fontWeight: "bold",
    color: COLORS.WHITE,
    textAlign: "center",
  },
});

export default UpdateProfile;
