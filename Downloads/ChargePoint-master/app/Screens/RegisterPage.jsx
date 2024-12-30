// src/screens/RegisterPage.js
import React, { useState } from "react";
import {
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
} from "react-native";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import { useNavigation } from "expo-router";
import { COLORS } from "../../constants/COLORS";
import auth from "@react-native-firebase/auth";
import { POSTDATA } from "../../hook/MethodAPI";

function RegisterPage() {
  // Local state to store input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // Handle form submission (basic validation)
  const handleRegister = async () => {
    setLoading(true);

    try {
      if (!name) {
        setError({ name: "Name is required" });
        setLoading(false);
        return;
      }

      if (!email) {
        setError({ email: "email is required" });
        setLoading(false);
        return;
      }

      if (!password) {
        setError({ password: "password is required" });
        setLoading(false);
        return;
      }

      if (!confirm_password) {
        setError({ confirm_password: "confirm_password is required" });
        setLoading(false);
        return;
      }

      if (!phone) {
        setError({ phone: "phone is required" });
        setLoading(false);
        return;
      }

      if (!country) {
        setError({ country: "country is required" });
        setLoading(false);
        return;
      }

      if (password !== confirm_password) {
        setError({ match: "Password and confirm password must match." });
        setLoading(false);
        return;
      }

      await auth().createUserWithEmailAndPassword(email, password);
      await POSTDATA("Users", {
        fullName: name,
        email: email.trim().toLowerCase(),
        phoneNumber: phone,
        country,
      }).then(() => {
        navigation.navigate("Login");
        setLoading(false);
      });
    } catch (e) {
      alert(e.message.slice(28, e.message.length));
      setLoading(false);
    }
  };

  return (
    <Pressable style={[styles.container]} onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior="padding" style={{ width: "100%" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.title, { color: COLORS.BLACK }]}>Register</Text>
          <TextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          {error?.name ? (
            <HelperText type="error">{error?.name}</HelperText>
          ) : null}

          <TextInput
            label="Email"
            value={email.trim().toLowerCase()}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
          {error?.email ? (
            <HelperText type="error">{error?.email}</HelperText>
          ) : null}

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
          {error?.password ? (
            <HelperText type="error">{error?.password}</HelperText>
          ) : null}

          <TextInput
            label="Confirm Password"
            value={confirm_password}
            onChangeText={setConfirmPassword}
            style={styles.input}
            secureTextEntry
          />
          {error?.confirm_password ? (
            <HelperText type="error">{error?.confirm_password}</HelperText>
          ) : null}

          <TextInput
            keyboardType="phone-pad"
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />
          {error?.phone ? (
            <HelperText type="error">{error?.phone}</HelperText>
          ) : null}

          <TextInput
            label="Country"
            value={country}
            onChangeText={setCountry}
            style={styles.input}
          />
          {error?.country ? (
            <HelperText type="error">{error?.country}</HelperText>
          ) : null}

          {error?.match ? (
            <HelperText type="error">{error?.match}</HelperText>
          ) : null}

          <Button
            mode="contained"
            onPress={handleRegister}
            style={styles.button}
            // disabled={loading}
          >
            {loading ? "Loading" : "Register"}
          </Button>
          <Button
            // mode="text"
            onPress={() => navigation.goBack()}
            style={styles.linkButton}
            labelStyle={{ color: COLORS.ACCENT }}
          >
            Already have an account? Login
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </Pressable>
  );
}

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

export default RegisterPage;
