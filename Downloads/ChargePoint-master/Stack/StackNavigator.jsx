import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ContextUser } from "../context/ContextProvider";

import WelcomePage from "../app/Screens/WelcomePage";
import LoginPage from "../app/Screens/LoginPage";
import RegisterPage from "../app/Screens/RegisterPage";
import HomePage from "../app/Screens/HomePage";
import ProfilePage from "../app/Screens/ProfilePage";
import MyChagarPoint from "../app/Screens/MyChagarPoint";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { isAuthenticated } = useContext(ContextUser);

  return (
    <>
      {!isAuthenticated ? (
        <Stack.Navigator initialRouteName="welcome">
          <Stack.Screen
            name="welcome"
            component={WelcomePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="profile"
            component={ProfilePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="chargePoints"
            component={MyChagarPoint}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default StackNavigator;
