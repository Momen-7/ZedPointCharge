import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Avatart from "../../assets/user.png";
import { COLORS } from "../../constants/COLORS";
import UpdateProfile from "../../components/updateProfile/UpdateProfile";
import { ContextUser } from "../../context/ContextProvider";

const ProfilePage = () => {
  const [update, setUpdate] = useState(false);

  const navigation = useNavigation();
  const { user } = useContext(ContextUser);

  return (
    <SafeAreaView style={styles.Profile}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ paddingLeft: 20 }}
      >
        <Ionicons name="arrow-back" style={styles.goback} />
      </TouchableOpacity>

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.Profile_content}>
          <View style={styles.image}>
            <Image source={Avatart} style={{ width: 75, height: 75 }} />
            <Text style={styles.imgText}>Welcome, {user?.data?.fullName}</Text>
          </View>

          <View style={styles.info}>
            <View style={styles.info_data}>
              <Text style={styles.dataTitle}>Full Name: </Text>
              <Text style={styles.dataSub}>{user?.data?.fullName}</Text>
            </View>
            <View style={styles.info_data}>
              <Text style={styles.dataTitle}>Email: </Text>
              <Text style={styles.dataSub}>{user?.data?.email}</Text>
            </View>
            <View style={styles.info_data}>
              <Text style={styles.dataTitle}>Phone Number: </Text>
              <Text style={styles.dataSub}>{user?.data?.phoneNumber}</Text>
            </View>
            <View style={styles.info_data}>
              <Text style={styles.dataTitle}>Country: </Text>
              <Text style={styles.dataSub}>{user?.data?.country}</Text>
            </View>

            <View style={styles.updateProfile}>
              <TouchableOpacity
                style={styles.Button}
                onPress={() => setUpdate(true)}
              >
                <Text style={styles.ButtonText}>Update Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      {update && <UpdateProfile onClose={() => setUpdate(false)} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Profile: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 10 : 0,
  },
  goback: {
    fontSize: 25,
    color: "#333",
  },
  Profile_content: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  imgText: {
    color: "#555",
    fontWeight: "bold",
    fontSize: 16,
  },
  info: {
    marginVertical: 50,
    width: "100%",
    gap: 15,
  },
  info_data: {
    flexDirection: "row",
    marginBottom: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 5,
  },
  dataTitle: {
    color: COLORS.BLACK,
    fontWeight: "bold",
    fontSize: 16,
  },
  dataSub: {
    color: COLORS.GRAY,
    fontSize: 16,
  },
  updateProfile: {
    marginVertical: 20,
  },
  Button: {
    width: "50%",
    height: 40,
    backgroundColor: COLORS.BLACK,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
  },
  ButtonText: {
    color: COLORS.WHITE,
    fontWeight: "bold",
  },
});

export default ProfilePage;
