import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  Dimensions,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Drawer from "../../components/Drawer/Drawer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Map from "../../components/Map/Map";
import { ContextUser } from "../../context/ContextProvider";
import Storage from "expo-storage";
import { GETDATA } from "../../hook/MethodAPI";
import FilterMap from "../../components/FilterMap/FilterMap";

const HomePage = () => {
  const [open_drawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const { handlerUsers, handlerChargePoints } = useContext(ContextUser);

  // Get All Users and filter user by authenticated
  useEffect(() => {
    const getUser = async () => {
      const getStorage = await Storage.getItem({ key: "email" });
      if (getStorage && handlerUsers) {
        GETDATA("Users", handlerUsers);
      }
    };

    getUser();
  }, []);

  // Get All ChargePoints
  useEffect(() => {
    const GetAllChargePoints = async () => {
      await GETDATA("chargePoints", handlerChargePoints);
    };

    GetAllChargePoints();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* Add the button for opening the drawer */}
        <View style={styles.title_home}>
          <View style={styles.icon_drawer}>
            <TouchableOpacity onPress={handleOpenDrawer} style={{ width: 35 }}>
              <MaterialIcons name="menu-open" size={35} />
            </TouchableOpacity>
          </View>

          <FilterMap />
        </View>

        <View style={styles.map}>
          <Map />
        </View>
        <StatusBar hidden={false} />
      </SafeAreaView>

      {open_drawer && (
        <Drawer isOpen={open_drawer} closeDrawer={() => setOpenDrawer(false)} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 10 : 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
  },
  title_home: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  icon_drawer: {
    width: "40%",
    height: 50,
    justifyContent: "center",
    textAlign: "left",
    marginHorizontal: 10,
  },
  filter_map: {
    width: "60%",
    height: "100%",
  },
  map: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height - 95,
  },
});

export default HomePage;
