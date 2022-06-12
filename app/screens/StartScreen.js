import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { theme } from "../core/theme";
import IncorrectTokenError from "../errors/IncorrectTokenError";
import User from "../models/User";
import { StyleSheet, View } from 'react-native'

async function checklogin(navigation) {
    if (localStorage.getItem("userToken") != undefined) {
      try {
        await User.getUser(localStorage.getItem("userToken"));
        navigation.navigate("Dashboard", { navigation });
      } catch (error) {
        if (error instanceof IncorrectTokenError) {
          console.log("error" + error);
          localStorage.removeItem("userToken");
        }
      }
  }
}

export default function StartScreen({ navigation }) {
  
    checklogin(navigation);

    return (
     
      <Background>
         <View style={styles.container}>
        <Logo />
        <Header>Run4Cause</Header>
        <Paragraph>Courir pour des causes.</Paragraph>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("LoginScreen")}
        >
          Connexion
        </Button>
        <Button
          disabled={true}
          mode="outlined"
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          S'inscrire
        </Button>
        </View>
      </Background>
      
    );
};

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
    minHeight: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: '5%',
    
  }
})
