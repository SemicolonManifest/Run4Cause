import React from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import Button from '../components/Button'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { theme } from '../core/theme'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


export default function NavBar(props) {
    
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    const navigation = props.navigation
    const navigateTo = (target) => {
        navigation.navigate(target)
    }

    const onSwipe = (gestureName, gestureState) => {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        console.log(gestureName);
      };

    return(
        <View style={styles.container}>
            <View style={styles.navbar}>
                <Pressable onPress={toggleDrawer}>
                    <FontAwesomeIcon icon={faBars} size={30} color={theme.colors.text} />
                </Pressable>
            </View>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                size={250}
                styles={styles.drawer}
            >
                <Pressable onPress={toggleDrawer}>
                    <FontAwesomeIcon icon={faXmark} size={30} color={theme.colors.text} onPress={toggleDrawer} />
                </Pressable>
                
                <Button mode="contained" style={styles.navButton} onPress={() => navigateTo("Dashboard")}>Dashboard</Button>
                
            </Drawer>
            <GestureRecognizer onSwipe={onSwipe} style={styles.childrenView}>
            
            {props.children}
            </GestureRecognizer>
            
        </View>
    )
}

const styles = StyleSheet.create({
    navButton: {
        borderRadius: 0,
        width: '80%',
        margin: '10%',
    },
    navbar: {
        paddingLeft: 10,
        height: '5%',
        justifyContent: 'center',
    },
    drawer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: theme.colors.primary,
        height: '100%',
        width: '100%',
        top: 0,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        
    },
    childrenView: {
        flex1: 1,
        height: '95%',
    }
})
