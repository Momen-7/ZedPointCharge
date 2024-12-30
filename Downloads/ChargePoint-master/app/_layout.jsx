import React from "react";
import { StatusBar } from "react-native";
import "react-native-reanimated";

import { ContextProvider } from "../context/ContextProvider";
import StackNavigator from "../Stack/StackNavigator";

const RootLayout = () => {
  return (
    <>
      <ContextProvider>
        <StackNavigator />
      </ContextProvider>

      <StatusBar barStyle={"dark-content"} backgroundColor={"#f6f6f6"} />
    </>
  );
};

export default RootLayout;
