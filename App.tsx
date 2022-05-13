import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Banner} from './app/components/Banner';
import { AuthenticationForm} from './app/components/AuthenticationForm';

export default function App() {
  return (
    <View style={styles.container}>
      <Banner />
      <AuthenticationForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});
