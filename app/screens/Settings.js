import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import User from '../models/User'
import NavBar from '../components/NavBar'

export default function Settings({ navigation }) {
  User.currentUser = JSON.parse(localStorage.getItem('currentUser'))

  return (
    <NavBar navigation={navigation}>
      <Background>
        
        <Header>Settings</Header>
        
      </Background>
    </NavBar>
  )
}