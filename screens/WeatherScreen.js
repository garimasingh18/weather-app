import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

import { API_KEY } from "../utils/WeatherAPIKey";

import Weather from "../components/Weather";
import * as Location from "expo-location";

export default class WeatherScreen extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    locationName: "",
    error: null,
  };
  componentDidMount() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${this.props.lat}&lon=${this.props.lon}&APPID=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          locationName: json.name,
          isLoading: false,
        });
      });
  }

  render() {
    const { isLoading, weatherCondition, temperature, locationName } =
      this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching The Weather</Text>
          </View>
        ) : (
          <Weather
            weather={weatherCondition}
            temperature={temperature}
            locationName={locationName}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFDE4",
  },
  loadingText: {
    fontSize: 30,
  },
});
