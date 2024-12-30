// src/screens/WelcomePage.js
import React, { useEffect, useState } from "react";
import { View, Animated } from "react-native";
import { useNavigation } from "expo-router";

const WelcomePage = () => {
  const [fadeAnim] = useState(new Animated.Value(0));

  const navigation = useNavigation(); // Assuming useNavigation hook is imported from react-navigation

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      navigation.navigate("Login"); // Navigate to Login Page after 4 seconds if no user is logged in yet.
    }, 4000);
  }, []);

  const containerStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
  };

  const textStyle = {
    color: "#000000",
    fontSize: 24,
  };

  return (
    <View style={containerStyle}>
      <Animated.Text style={[textStyle, { opacity: fadeAnim }]}>
        Zed Point Charge
      </Animated.Text>
    </View>
  );
};

export default WelcomePage;
