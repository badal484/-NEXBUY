import React, { useState } from "react";
import {View,TextInput,Button,Alert,StyleSheet} from "react-native";
import API from "../../services/api";

const AddProductScreen = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = async () => {
    try {
      await API.post("/products/add", {
        title,
        price,
        lng: 77.59,
        lat: 12.97,
      });

      Alert.alert("Success", "Product Added");
    } catch (err: any) {
      Alert.alert("Error", err?.response?.data?.msg);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Product Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
      />

      <Button title="Add Product" onPress={handleAdd} />
    </View>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
});
