import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { theme } from '../core/theme'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Run4Cause</Header>
      <Paragraph>
        Courir pour des causes.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Connexion
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        S'inscrire
      </Button>
    </Background>
  )
}
