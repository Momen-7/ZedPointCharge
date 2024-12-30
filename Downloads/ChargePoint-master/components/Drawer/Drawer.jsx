import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Pressable,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import { useNavigation } from "expo-router";
import { AntDesign, FontAwesome6, SimpleLineIcons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { ContextUser } from "../../context/ContextProvider";
import Storage from "expo-storage";

const Drawer = ({ isOpen, closeDrawer }) => {
  const navigation = useNavigation();
  const { user, handlerUsers, setIsAuthenticated } = useContext(ContextUser);

  const handlerPress = (path) => {
    navigation.navigate(path);
    closeDrawer();
  };

  const handleLogout = async () => {
    await auth().signOut();
    await Storage.removeItem({ key: "email" });
    handlerUsers({ data: [] });
    setIsAuthenticated(false);
  };

  return (
    <View
      style={[
        styles.drawer,
        isOpen
          ? { backfaceVisibility: "visible" }
          : { backfaceVisibility: "hidden" },
      ]}
    >
      <Pressable onPress={closeDrawer}>
        <View style={styles.Overlay} />
      </Pressable>
      <View style={styles.drawer_content}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Welcome, {user?.data?.fullName}</Text>
        </View>
        <View style={styles.list}>
          <TouchableOpacity
            onPress={() => handlerPress("profile")}
            style={styles.listItem}
          >
            <FontAwesome6 name="circle-user" style={styles.icon} />
            <Text style={styles.item}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlerPress("chargePoints")}
            style={styles.listItem}
          >
            <AntDesign name="barschart" style={styles.icon} />
            <Text style={styles.item}>My Chager Point</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.listItem}>
            <SimpleLineIcons name="logout" style={styles.icon} />
            <Text style={styles.item}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar hidden={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    zIndex: 99999,
  },
  Overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: -1,
  },
  drawer_content: {
    width: Dimensions.get("screen").width <= 360 ? "70%" : "60%",
    backgroundColor: "white",
    height: Dimensions.get("screen").height,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    justifyContent: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  titleText: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  list: {
    marginVertical: 20,
    gap: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 5,
  },
  item: {
    fontSize: 20,
    color: "#666",
  },
  icon: {
    fontSize: 20,
    color: "#666",
  },
});

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};

export default Drawer;
