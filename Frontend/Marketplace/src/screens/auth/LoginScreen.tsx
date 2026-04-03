/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert("Error", "All fields are required");
    return;
  }

  try {
    const res = await axios.post(
      "http://10.0.2.2:5004/api/auth/login",
      { email, password }
    );

    Alert.alert("Success", "Login Successful");
    console.log(res.data);

    navigation.navigate("Home");

  } catch (err: any) {
    Alert.alert("Error", err?.response?.data?.msg || "Login failed");
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Navigate to Register */}
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ textAlign: "center", marginTop: 15 }}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f9f9f9",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});