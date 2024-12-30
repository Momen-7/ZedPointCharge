import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import { useNavigation } from "expo-router";
import { COLORS } from "../../constants/COLORS";
import auth from "@react-native-firebase/auth";
import { Storage } from "expo-storage";
import { ContextUser } from "../../context/ContextProvider";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { setIsAuthenticated } = useContext(ContextUser);

  // Validate the login form
  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!email) {
        setEmailError("Email is required");
        setLoading(false);
        return;
      }
      if (!password) {
        setPasswordError("Password is required");
        setLoading(false);
        return;
      }

      if (email && password) {
        await auth().signInWithEmailAndPassword(email, password);
        await Storage.setItem({
          key: "email",
          value: JSON.stringify(email),
        });
        setIsAuthenticated(true);
        setLoading(false);
      }
    } catch (error) {
      alert("Email/Password Incorrect.");
      setLoading(false);
    }
  };

  return (
    <Pressable style={[styles.container]} onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior="padding" style={{ width: "100%" }}>
        <Text style={[styles.title]}>Login</Text>

        {/* Email Input */}
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          theme={{ colors: "#6200ee" }}
        />
        {emailError ? <HelperText type="error">{emailError}</HelperText> : null}

        {/* Password Input */}
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          theme={{ colors: "#6200ee" }}
        />
        {passwordError ? (
          <HelperText type="error">{passwordError}</HelperText>
        ) : null}

        {/* Login Button */}
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          {loading ? "Loading" : "Login"}
        </Button>

        {/* Register Link */}
        <Button
          mode="text"
          onPress={() => navigation.navigate("Register")}
          style={styles.linkButton}
          labelStyle={{ color: COLORS.ACCENT }}
        >
          Don&apos;t have an account? Register
        </Button>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f6f6f6",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: COLORS.WHITE,
    color: COLORS.BLACK,
  },
  button: {
    width: "100%",
    marginTop: 10,
    backgroundColor: COLORS.BLACK,
    color: COLORS.WHITE,
  },
  linkButton: {
    marginTop: 10,
  },
});

export default LoginPage;
