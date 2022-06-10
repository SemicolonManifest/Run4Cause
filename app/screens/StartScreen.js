import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { theme } from "../core/theme";
import IncorrectTokenError from "../errors/IncorrectTokenError";
import User from "../models/User";

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
      </Background>
    );
};
