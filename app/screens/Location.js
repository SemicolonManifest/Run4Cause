import React, { useState } from "react";
import Background from "../components/Background";
import Button from "../components/Button";
import User from "../models/User";
import NavBar from "../components/NavBar";
import { StyleSheet, View, Text, Pressable } from "react-native";
import TextInput from "../components/TextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Location({ navigation }) {
  const getUser = async () => {
    let jsonuser = await AsyncStorage.getItem("currentUser");
    User.currentUser = JSON.parse(jsonuser);
  };
  getUser();

  

  return (
    <NavBar navigation={navigation}>
      <Background>
        <View style={styles.container}>
          <View>
            <Text>Location</Text>

            
          </View>
          <Button
            mode="contained"
            style={styles.navButton}
            onPress={() => updateUser()}
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
