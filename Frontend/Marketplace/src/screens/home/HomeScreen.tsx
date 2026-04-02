import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import API from "../../services/api";
import ProductCard from "../../components/product/ProductCard";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await API.get(
        "/products/nearby?lng=77.59&lat=12.97"
      );
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Nearby Products</Text>

      <FlatList
        data={products}
        keyExtractor={(item: any) => item._id}
        renderItem={({ item }: any) => <ProductCard product={item} />}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
});