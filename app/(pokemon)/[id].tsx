import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Pokemon, getPokemonDetails } from "../../api/pokeapi";
import asyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const test = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [details, setDetails] = useState<Pokemon>();
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const load = async () => {
      const detail = await getPokemonDetails(id!);
      setDetails(detail);
      navigation.setOptions({
        title: detail.name.charAt(0).toLocaleUpperCase() + detail.name.slice(1),
      });

      const isFav = await asyncStorage.getItem(`favourite-[${id}]`);
      setIsFavorite(isFav === "true");
    };

    load();
  }, [id]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text onPress={toggleFavourite}>
          <Ionicons
            name={isFavorite ? "star" : "star-outline"}
            size={24}
            color={"#fff"}
          />
        </Text>
      ),
    });
  }, [isFavorite]);

  const toggleFavourite = async () => {
    await asyncStorage.setItem(
      `favourite-[${id}]`,
      !isFavorite ? "true" : "false"
    );
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={{ padding: 10 }}>
      {details && (
        <>
          <View style={{ ...styles.card, alignItems: "center" }}>
            <Image
              source={{ uri: details.sprites.front_default }}
              style={{ width: 200, height: 200 }}
            />
            <Text style={{ fontSize: 24, textTransform: "capitalize" }}>
              {details.name}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Stats:</Text>
            {details.stats.map((item: any) => (
              <Text key={item.stat.name} style={{ textAlign: "left" }}>
                {item.stat.name}
              </Text>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    elevation: 1,
    textShadowRadius: 1,
    gap: 4,
  },
});

export default test;
