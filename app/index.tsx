import { Pokemon, getPokemons } from "../api/pokeapi";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const load = async () => {
      const results = await getPokemons();
      setPokemons(results);
    };

    load();
  }, []);
  return (
    <ScrollView>
      {pokemons.map((pokemon: Pokemon) => (
        <Link key={pokemon.id} href={`/(pokemon)/${pokemon.id}`} asChild>
          <TouchableOpacity>
            <View style={styles.item}>
              <Image source={{ uri: pokemon.image }} style={styles.preview} />
              <Text style={{ flex: 1, textTransform: "capitalize" }}>
                {pokemon.name}
              </Text>
              <Ionicons name={"chevron-forward"} size={20} />
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderColor: "#f4511e",
  },
  preview: {
    width: 100,
    height: 100,
  },
});
