import React, { useState } from "react";
import Background from "../components/Background";
import Button from "../components/Button";
import User from "../models/User";
import NavBar from "../components/NavBar";
import { StyleSheet, View, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DeviceLocation from "expo-location";

export default function Location({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getUser = async () => {
    let jsonuser = await AsyncStorage.getItem("currentUser");
    User.currentUser = JSON.parse(jsonuser);
  };

  const getLocationAsync = async () => {
    let { status } = await DeviceLocation.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }

    let { coords } = await DeviceLocation.getCurrentPositionAsync();

    setLocation(coords);
  };

  getUser();
  getLocationAsync();


  return (
    <NavBar navigation={navigation}>
      <Background>
        <View style={styles.container}>
          <View>
            <Text>Location</Text>
            <Text>{!location ? 'Waiting'
          : `Lat: ${location.latitude} \nLong: ${
              location.longitude
            }`}</Text>
          </View>
          <Button
            mode="contained"
            style={styles.navButton}
            onPress={() => getLocationAsync()}
          >
            Update
          </Button>
        </View>
      </Background>
    </NavBar>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
