import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import ItemPage from "../pages/ItemPage";
import FolderDetailsPage from "../pages/FolderDetailsPage";
import CartPage from "../pages/CartPage";
import { IconButton } from "react-native-paper";
import MainTabScreen from "./MainTabScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import SellerPage from "../pages/SellerPage";
import SettingsPage from '../pages/SettingsPage';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const AppScreenStack = ({ navigation }) => {
    return (
      <PaperProvider>
        <Stack.Navigator initialRouteName="MainTab">
          <Stack.Screen
            name="Main"
            component={MainTabScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Item Details"
            component={ItemPage}
            options={{
              headerRight: () => (
                <IconButton
                  icon="basket"
                  size={20}
                  onPress={() => {
                    navigation.navigate("Cart");
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Folder Details"
            component={FolderDetailsPage}
          />
          <Stack.Screen
            name="Cart"
            component={CartPage}
          />
          <Stack.Screen
            name="Seller"
            component={SellerPage}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsPage}
          />
        </Stack.Navigator>
      </PaperProvider>
    );
  };
  
  export default AppScreenStack