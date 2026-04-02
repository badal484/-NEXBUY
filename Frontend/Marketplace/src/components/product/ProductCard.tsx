import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProductCard = ({ product }: any) => {
  return (
    <View style={styles.card}>
      {product.images?.[0] && (
        <Image source={{ uri: product.images[0] }} style={styles.image} />
      )}

      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>₹ {product.price}</Text>

      <Text style={styles.shop}>
        Shop: {product.shop?.name || "N/A"}
      </Text>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  image: {
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    color: "green",
    marginVertical: 5,
  },
  shop: {
    fontSize: 12,
    color: "gray",
  },
});