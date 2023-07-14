import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { weatherConditions } from "../utils/WeatherConditions";

const Weather = ({ weather, temperature, locationName }) => {
  if (weather != null) {
    return (
      <View
        style={[
          styles.weatherContainer,
          { backgroundColor: weatherConditions[weather].color },
        ]}
      >
        <View style={styles.bodyContainer}>
          <Text style={styles.locationName}>{locationName}</Text>
        </View>

        <View style={styles.headerContainer}>
          <MaterialCommunityIcons
            size={72}
            name={weatherConditions[weather].icon}
            color={"#fff"}
          />
          <Text style={styles.tempText}>{temperature}˚</Text>
        </View>
        <Text style={styles.title}>{weatherConditions[weather].title}</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  headerContainer: {
    flex: 5,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    padding: 20,
  },

  tempText: {
    fontSize: 72,
    color: "#fff",
  },

  title: {
    fontSize: 60,
    color: "#fff",
    flex: 1,
    alignSelf: "center",
  },
  locationName: {
    fontSize: 30,
    color: "#fff",
    flex: 1,
    alignItems: "center",
  },
});

export default Weather;
