import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { weatherConditions } from "../utils/WeatherConditions";

const ExtendedForecast = ({ weather, date, temperature, description }) => {
  if (weather != null) {
    return (
      <View
        style={[
          styles.weatherContainer,
          { backgroundColor: weatherConditions[weather].color },
        ]}
      >
        <View style={styles.icon}>
          <MaterialCommunityIcons
            size={72}
            name={weatherConditions[weather].icon}
            color={"#fff"}
          />
        </View>
        <View style={styles.weatherConditionsContainer}>
          <Text style={styles.title}>{date}</Text>
          <Text style={styles.subtitle}>{temperature}°</Text>
          <Text style={styles.subtitle}>{description}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>something went wrong</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  weatherContainer: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  weatherConditionsContainer: {
    fontSize: 30,
    padding: 10,
  },
  title: {
    fontSize: 30,
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
  },
});

export default ExtendedForecast;
