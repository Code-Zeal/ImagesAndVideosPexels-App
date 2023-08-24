import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import ImageScreen from "./screens/ImageScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, Text } from "react-native";
import pexelsLogo from "./assets/pexels_141591.webp";
const Stack = createNativeStackNavigator();
export default function App() {
  const [openSearch, setopenSearch] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          options={{
            headerLeft: () => (
              <Image className="h-[40px] w-[40px] mr-2" source={pexelsLogo} />
            ),
            headerRight: () => (
              <Text
                onPress={() => setopenSearch(!openSearch)}
                className="text-white text-lg"
              >
                {openSearch ? "Close" : "Search"}
              </Text>
            ),
            title: "Pexels App",
            headerStyle: { backgroundColor: "#171717" },
            headerTintColor: { color: "#fff" },
            headerTitleStyle: { fontWeight: "bold", color: "#fff" },
          }}
        >
          {(props) => <HomeScreen {...props} openSearch={openSearch} />}
        </Stack.Screen>
        <Stack.Screen
          name="ImageScreen"
          component={ImageScreen}
          options={{
            headerLeft: () => (
              <Image className="h-[40px] w-[40px] mr-2" source={pexelsLogo} />
            ),

            title: "Pexels App",
            headerStyle: { backgroundColor: "#171717" },
            headerTintColor: { color: "#fff" },
            headerTitleStyle: { fontWeight: "bold", color: "#fff" },
          }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
