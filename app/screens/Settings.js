import React, { useState } from "react";
import Background from "../components/Background";
import Button from "../components/Button";
import User from "../models/User";
import NavBar from "../components/NavBar";
import { StyleSheet, View, Text, Pressable } from "react-native";
import TextInput from "../components/TextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings({ navigation }) {
  const getUser = async () => {
    let jsonuser = await AsyncStorage.getItem("currentUser");
    User.currentUser = JSON.parse(jsonuser);
  };
  getUser();

  const [name, setName] = useState({ value: User.currentUser.name, error: "" });
  const [email, setEmail] = useState({
    value: User.currentUser.email,
    error: "",
  });

  const updateUser = async () => {
    alert("not implemented yet");
  };

  return (
    <NavBar navigation={navigation}>
      <Background>
        <View style={styles.container}>
          <View>
            <Text>User settings</Text>

            <TextInput
              label="Name"
              returnKeyType="done"
              value={name.value}
              onChangeText={(text) => setName({ value: text, error: "" })}
              error={!!name.error}
              errorText={name.error}
            />

            <TextInput
              label="Email"
              returnKeyType="next"
              value={email.value}
              onChangeText={(text) => setEmail({ value: text, error: "" })}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
            />
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
