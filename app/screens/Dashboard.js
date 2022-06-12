import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import User from '../models/User'
import NavBar from '../components/NavBar'
import { StyleSheet, View } from 'react-native'

export default function Dashboard({ navigation }) {
  User.currentUser = JSON.parse(localStorage.getItem('currentUser'))

  return (
    <NavBar navigation={navigation}>
      <Background>
        <View style={styles.container}>
        <Logo />
        <Header>Let’s start</Header>
        <Paragraph>
          Your amazing app starts here. Open you favorite code editor and start editing this project.
        </Paragraph>
        <Button
          mode="outlined"
          onPress={() =>{
            localStorage.removeItem("userToken");
            navigation.reset({
              index: 0,
              routes: [{ name: 'StartScreen' }],
            })
          }
        }
        >
          Logout
        </Button>
        </View>
      </Background>
    </NavBar>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
})