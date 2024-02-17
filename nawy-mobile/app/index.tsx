import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Apartment } from "@/types/apartment";
import { useEffect, useState } from "react";
import { API_URL } from "@/constants/config";
import apartemntImage from "../assets/images/apartment.jpeg";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
export default function TabOneScreen() {
  const [data, setData] = useState<Apartment[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(undefined);
  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    fetch(`${API_URL}/apartements`)
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
    return () => {
      ignore = true;
    };
  }, []);
  if (isLoading) {
    return <ActivityIndicator size={"large"} />;
  }
  if (error !== undefined) throw new Error("error loading data");
  if (data)
    return (
      <SafeAreaView style={[styles.container]}>
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          initialNumToRender={10}
          contentContainerStyle={styles.flatListContentContainer}
          style={styles.flatListContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                router.navigate({
                  pathname: "/[id]",
                  params: { id: item._id },
                });
              }}
            >
              <View style={styles.aparView}>
                <Image
                  source={apartemntImage}
                  style={{ width: 50, height: 50 }}
                />

                <View style={styles.text}>
                  <Text style={styles.areaText}>
                    {item.location.area}, {item.location.city}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContentContainer: {
    rowGap: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  flatListContainer: {},
  noContentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noContentText: {
    fontSize: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "column",
    padding: 12,
    borderRadius: 20,
  },
  aparView: {
    columnGap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    rowGap: 8,
  },
  text: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  areaText: { fontSize: 16, fontWeight: "bold" },
});
