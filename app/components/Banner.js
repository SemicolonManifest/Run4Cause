import { StatusBar } from 'expo-status-bar'
import { Text, StyleSheet, View } from 'react-native'

export function Banner() {
    return( 
        <View style={styles.container}>
            <Banner></Banner>
            <View style={styles.textContainer}>¨
            <Text style={styles.text}>Hello</Text>
            <StatusBar style="auto"/>
            </View>
        </View>
         
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})