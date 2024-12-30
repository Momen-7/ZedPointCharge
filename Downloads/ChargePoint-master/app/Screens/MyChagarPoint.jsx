import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  FlatList,
} from "react-native";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/COLORS";
import ChargePoints from "../../components/ChargePoints/ChargePoints";
import { useNavigation } from "expo-router";
import { DELETEDATA, GETDATA } from "../../hook/MethodAPI";
import { ContextUser } from "../../context/ContextProvider";

const MyChagarPoint = () => {
  const [add_chargepoint, setAddChargePoint] = useState(false);
  const [edit_chargepoint, setEditChargePoint] = useState({
    isEdit: false,
  });
  const [data, setData] = useState([]);

  const navigation = useNavigation();
  const { handlerChargePoints, chargePoint, user } = useContext(ContextUser);

  // Get All ChargePoints for Users
  useEffect(() => {
    const GetAllChargePoints = async () => {
      try {
        await GETDATA("chargePoints", handlerChargePoints);
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    };

    GetAllChargePoints();
  }, []);

  // Get ChargePoints from User
  useEffect(() => {
    if (chargePoint) {
      const dataUser = chargePoint?.filter(
        (chargePoint) => chargePoint.data.ownerId === user?.id
      );

      if (dataUser) {
        if (data?.find((charge) => charge.id === dataUser?.id)) return;
        setData(dataUser);
      }
    }
  }, [chargePoint, user]);

  const onDelete = async (id) => {
    try {
      await DELETEDATA("chargePoints", id);
      await GETDATA("chargePoints", handlerChargePoints);
      Alert.alert("Delete", "Charge Point Deleted Successfully");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ padding: 10 }}
      >
        <Ionicons name="arrow-back" size={30} />
      </TouchableOpacity>

      {data?.length < 1 && (
        <Text
          style={{
            textAlign: "center",
            marginVertical: 20,
            fontWeight: "bold",
          }}
        >
          No charge points available.
        </Text>
      )}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.chargePoint}>
            <View>
              <Text style={{ fontSize: 16 }}>{item?.data?.name}</Text>
            </View>

            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => setEditChargePoint({ isEdit: true, data: item })}
              >
                <Feather name="edit" size={20} color={"blue"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDelete(item.id)}>
                <AntDesign name="delete" size={20} color={"brown"} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.bottom}
        onPress={() => setAddChargePoint(true)}
      >
        <Entypo name="plus" size={30} color={COLORS.WHITE} />
      </TouchableOpacity>
      {edit_chargepoint.isEdit && (
        <ChargePoints
          defualtValue={edit_chargepoint?.data}
          onClose={() => setEditChargePoint({ isEdit: false })}
          edit={true}
        />
      )}
      {add_chargepoint && (
        <ChargePoints onClose={() => setAddChargePoint(false)} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottom: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.ACCENT,
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 999,
  },
  chargePoint: {
    width: Dimensions.get("screen").width,
    marginTop: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default MyChagarPoint;
