import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Storage from "expo-storage";
import { Alert } from "react-native";

const ContextUser = createContext();

const AuthRouter = () => {
  return useContext(ContextUser);
};

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chargePoint, setChargePoint] = useState([]);
  const [email_storage, setEmailStorage] = useState("");
  const [location, setLocation] = useState();

  useEffect(() => {
    const getStorage = async () => {
      const Email = await Storage.getItem({ key: "email" });
      if (Email) {
        setEmailStorage(Email);
      }
    };
    getStorage();
  }, []);

  const handlerUsers = async (data) => {
    try {
      const Email = await Storage.getItem({ key: "email" });

      if (data?.length && Email) {
        setUser(data.find((user) => user.data.email === JSON.parse(Email)));
      } else {
        setUser(null);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handlerChargePoints = async (data) => {
    setChargePoint(data);
  };

  const handlerLocations = (location) => {
    setLocation(location);
  };

  const values = {
    user,
    chargePoint,
    location,
    isAuthenticated,
    setUser,
    handlerUsers,
    handlerChargePoints,
    handlerLocations,
    setIsAuthenticated,
    email_storage,
  };

  return <ContextUser.Provider value={values}>{children}</ContextUser.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ContextProvider, ContextUser, AuthRouter };
