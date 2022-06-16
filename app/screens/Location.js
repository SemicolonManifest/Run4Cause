import React, { useState } from "react";
import Background from "../components/Background";
import Button from "../components/Button";
import User from "../models/User";
import NavBar from "../components/NavBar";
import { StyleSheet, View, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DeviceLocation from "expo-location";
import MapView from "react-native-maps";



export default function Location({ navigation }) {
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);

  let getUser = async () => {
    let jsonuser = await AsyncStorage.getItem("currentUser");
    User.currentUser = JSON.parse(jsonuser);
  };

  let getLocationAsync = async () => {
    let { status } = await DeviceLocation.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }

    let { coords } = await DeviceLocation.getCurrentPositionAsync({timeInterval: 5000,distanceInterval: 15});

    setLocation(coords);

  };

  let initializeRegion = () => {
    if (location) {
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }

  if(!User.currentUser){
    getUser();
  }

  if(!location){
    getLocationAsync();
  }

  if(!region){
    initializeRegion();
  }
 


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

          <MapView
            style={styles.map}
            initialRegion={region}
          >
            {!location ? null : (<MapView.Marker
              name="Current Location"
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            />)}
            
            
          </MapView>
          

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
  map: {
    width: "100%",
    height: "60%",
  }
});
