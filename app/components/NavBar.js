import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  DrawerLayoutAndroid,
} from "react-native";
import Button from "../components/Button";
import { theme } from "../core/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NavBar(props) {
  const drawer = useRef(null);

  const navigation = props.navigation;
  const navigateTo = (target) => {
    navigation.navigate(target);
    drawer.current.closeDrawer();
  };

  const drawerContent = () => (
    <View>
      <Pressable onPress={() => drawer.current.closeDrawer()}>
        <FontAwesomeIcon
          icon={faXmark}
          size={30}
          color={theme.colors.text}
          onPress={() => drawer.current.closeDrawer()}
        />
      </Pressable>

      <Button
        mode="contained"
        style={styles.navButton}
        onPress={() => navigateTo("Dashboard")}
      >
        Dashboard
      </Button>
      <Button
        mode="contained"
        style={styles.navButton}
        onPress={() => navigateTo("Location")}
      >
        Location
      </Button>
      <Button
        mode="contained"
        style={styles.navButton}
        onPress={() => navigateTo("Settings")}
      >
        Settings
      </Button>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={"left"}
        renderNavigationView={drawerContent}
        style={styles.drawerLayout}
      >
        <View style={styles.navbar}>
          <Pressable onPress={() => drawer.current.openDrawer()}>
            <FontAwesomeIcon
              icon={faBars}
              size={30}
              color={theme.colors.text}
            />
          </Pressable>
        </View>
        {props.children}
 
      </DrawerLayoutAndroid>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navButton: {
    borderRadius: 0,
    width: "80%",
    margin: "10%",
    fontSize: "1.4rem",
  },
  navbar: {
    paddingLeft: 10,
    height: "5%",
    justifyContent: "center",
  },
  drawerLayout: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: theme.colors.primary,
    height: "100%",
    width: "100%",
    top: 0,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  childrenView: {
    height: "95%",
    width: "100%",
  },
});
