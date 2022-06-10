import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function NavBar(){
    return(
        <View style={styles.container}>
        <Text style={styles.text}>NavBar</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'dodgerblue',
    },
    text: {
    }
})
