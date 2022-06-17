import React, { useState } from "react";
import Background from "../components/Background";
import Button from "../components/Button";
import User from "../models/User";
import NavBar from "../components/NavBar";
import { StyleSheet, View, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DeviceLocation from "expo-location";
import MapView from "react-native-maps";
import { Marker } from 'react-native-maps';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import LocationManager from "../models/LocationManager";



export default function Location({ navigation }) {
  
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [message, setMessage] = useState("message");
  let locationManager = null;

  let getUser = async () => {
    let jsonuser = await AsyncStorage.getItem("currentUser");
    User.currentUser = JSON.parse(jsonuser);
  };

  let getLocationAsync = async () => {
    let { status } = await DeviceLocation.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }

    let { coords } = await DeviceLocation.getCurrentPositionAsync({timeInterval: 500,distanceInterval: 15});

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

  let updateLocation = async () => {
    
    getLocationAsync();
    setTimeout(updateLocation, 500);

  }

  let submitLocation = async () => {
    setMessage(User.currentUser.token)
    try{
    await locationManager.submitLocation(location.latitude, location.longitude);
    }catch(error){
      setMessage(error.message);
    }
  }

  if(!User.currentUser){
    getUser();
  }

  if(!location){
    getLocationAsync();
    updateLocation();
  }

  if(!region){
    initializeRegion();
  }
  
  if(!locationManager){
    locationManager = new LocationManager(User.currentUser.token);
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
            showsUserLocation={true}
          >
      
            <Marker
              coordinate={{ latitude: 46.78053487730142, longitude: 6.64026263613881 }}
              title="Location 1"
              description="This is the first location"
            />
            
          </MapView>
          
          
          <Button
            mode="contained"
            style={styles.navButton}
            onPress={() => submitLocation()}
          >
            Submit location
          </Button>
          <Text>{message}</Text>
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
  },
  marker: {
    width: 1,
    height: '1%',
    maxHeight: 2,
  },
});
