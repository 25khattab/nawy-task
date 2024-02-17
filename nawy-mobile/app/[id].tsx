import { ActivityIndicator, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { Apartment } from "@/types/apartment";
import { useEffect, useState } from "react";
import { API_URL } from "@/constants/config";

export default function ApartementDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<Apartment | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(undefined);
  useEffect(() => {
    let ignore = false;
    if (id != undefined) {
      setIsLoading(true);
      fetch(`${API_URL}/apartements/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch");
          }
          return res.json();
        })
        .then((d) => {
          if (!ignore) {
            setData(d);
            setError(undefined);
          }
        })
        .catch((e) => {
          if (!ignore) {
            setError(e);
            setData(undefined);
          }
        })
        .finally(() => {
          if (!ignore) {
            setIsLoading(false);
          }
        });
    }
    return () => {
      ignore = true;
    };
  }, [id]);
  if (isLoading) {
    return <ActivityIndicator size={"large"} />;
  }
  if (error !== undefined) throw new Error("error loading data");
  if (data)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Apartement Area: {data.apartmentArea}</Text>
        <Text style={styles.title}>Bathrooms: {data.bathrooms}</Text>
        <Text style={styles.title}>Bedrooms: {data.bedrooms}</Text>
        <Text style={styles.title}>Price: {data.price}</Text>
        <Text style={styles.title}>Area: {data.location.area}</Text>
        <Text style={styles.title}>City: {data.location.city}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
