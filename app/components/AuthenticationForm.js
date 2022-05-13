import { Text, TextInput, StyleSheet, View, Button} from 'react-native'
import {useState} from 'react'

export function AuthenticationForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return(
        <View style={styles.form}>
            <Text style={styles.label}>Utilisateur</Text>
            <TextInput style={styles.input}/>
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput secureTextEntry={true} style={styles.input}/>
            <Button title="Se connecter" style={styles.button}/>
        </View>
    )
}

    const styles = StyleSheet.create({
        form: {
            borderColor: '#aaa',
            borderWidth: 1,
            padding: 15,
            borderRadius: 10,
            backgroundColor: '#aaf',
        },
        label: {
            fontSize: "large",
        },
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            borderRadius: 3,
            padding: 10,
            fontSize: "x-large",
            backgroundColor: '#fff',
        },
    });