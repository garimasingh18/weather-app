import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Location from "expo-location";

import WeatherScreen from "./screens/WeatherScreen";
import ExtendedForecastScreen from "./screens/ExtendedForecastScreen";

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  state = {
    isLoading: true,
    lat: "",
    lon: "",
  };

  componentDidMount() {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        isLoading: false,
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      });
    })();
  }

  HomeScreen({ navigation, route }) {
    const { lat, lon } = route.params;
    return (
      <View style={styles.navigation}>
        <WeatherScreen lat={lat} lon={lon}></WeatherScreen>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Details")}
        >
          <Text style={styles.text}>See Weather Forecast</Text>
        </Pressable>
      </View>
    );
  }

  ExtendedForecastScreen({ navigation, route }) {
    const { lat, lon } = route.params;
    return (
      <View style={styles.navigation}>
        <ExtendedForecastScreen lat={lat} lon={lon}></ExtendedForecastScreen>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.text}>Go to Home Screen</Text>
        </Pressable>
      </View>
    );
  }
  render() {
    return this.state.isLoading ? (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Fetching The Weather</Text>
      </View>
    ) : (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={this.HomeScreen}
            initialParams={{ lat: this.state.lat, lon: this.state.lon }}
          />
          <Stack.Screen
            name="Details"
            component={this.ExtendedForecastScreen}
            initialParams={{ lat: this.state.lat, lon: this.state.lon }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    paddingHorizontal: 50,
    fontSize: 20,
    backgroundColor: "black",
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    letterSpacing: 0.75,
    color: "white",
  },
  navigation: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
});
