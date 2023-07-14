import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import * as Location from "expo-location";
import moment from "moment";

import ExtendedForecast from "../components/ExtendedForecast";
import { API_KEY } from "../utils/WeatherAPIKey";

export default class ExtendedForecastScreen extends React.Component {
  state = {
    isLoading: true,
    dailyData: [],
    error: null,
  };

  componentDidMount() {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${this.props.lat}&lon=${this.props.lon}&APPID=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((json) => {
        const dailyData = json.list.filter((reading) =>
          reading.dt_txt.includes("18:00:00")
        );
        this.setState({
          dailyData: dailyData,
          isLoading: false,
        });
      });
  }

  render() {
    const { isLoading, dailyData } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching The Forecast</Text>
          </View>
        ) : (
          <View style={styles.dailyData}>
            <FlatList
              data={dailyData}
              renderItem={({ item }) => (
                <ExtendedForecast
                  weather={item.weather[0].main}
                  date={moment(item.dt_txt).format("MMMM Do YYYY")}
                  temperature={item.main.temp}
                  description={item.weather[0].description}
                ></ExtendedForecast>
              )}
            />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  dailyData: {
    flex: 1,
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
