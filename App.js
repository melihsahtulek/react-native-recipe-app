import React from "react";
import { Platform, SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomText from "./src/components/CustomText";
import HeaderButton from "./src/components/HeaderButton";

/* SCREENS */
import HomeScreen from "./src/screens/HomeScreen";
import CategoryFilterScreen from "./src/screens/CategoryFilterScreen";
import MealDetailScreen from "./src/screens/MealDetailScreen";

const Stack = createNativeStackNavigator();

import store from "./src/redux/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={([Platform.OS === "android" && { paddingTop: StatusBar.currentHeight }], { flex: 1 })}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: "#3c40c6",
              },
              headerTitleAlign: "center",
              headerTintColor: "#ffffff",
              headerRight: () => <HeaderButton title="" bgColor="" iconName="search" />,
              headerBackTitle: "",
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: () => <CustomText txt="recipe App" fontWeight="300" fontSize="20" /> }} />
            <Stack.Screen
              name="CategoryFilterScreen"
              component={CategoryFilterScreen}
              options={{ headerTitle: () => <CustomText txt="category detail" fontWeight="300" fontSize="20" /> }}
            />
            <Stack.Screen
              name="MealDetailScreen"
              component={MealDetailScreen}
              options={{ headerTitle: () => <CustomText txt="Meal detail" fontWeight="300" fontSize="20" /> }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
