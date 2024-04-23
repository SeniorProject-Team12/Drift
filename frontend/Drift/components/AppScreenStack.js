import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import ItemPage from "../pages/ItemPage";
import FolderDetailsPage from "../pages/FolderDetailsPage";
import CartPage from "../pages/CartPage";
import { IconButton } from "react-native-paper";
import MainTabScreen from "./MainTabScreen";
import SellerPage from "../pages/SellerPage";
import SettingsPage from "../pages/SettingsPage";
import SelectedOrderPage from "../pages/SelectedOrderPage";
import SelectedChatScreen from "../pages/SelectedChatScreen";
import Conversation from "../pages/chat/Conversation";
import UserProfile from "../pages/UserProfile";
import { useNavigation } from "@react-navigation/native";
import LiveChatPage from "../pages/LiveChatPage";
import SavedPaymentPage from "../pages/SavedPaymentPage";

const Stack = createStackNavigator();
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
              headerBackTitleVisible: false,
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
            options={{
              headerBackTitleVisible: false,
            }}
            />
          <Stack.Screen
            name="Order Details"
            component={SelectedOrderPage}
            options={{
              headerBackTitleVisible: false,
              // headerLeft: navigation.navigate("Orders")
            }}
          />
          <Stack.Screen
            name="Cart"
            component={CartPage}
            options={{
              headerBackTitleVisible: false
            }}
          />
          <Stack.Screen
            name="Conversation"
            component={Conversation}
            options={{
              headerBackTitleVisible: false
            }}
          />
          <Stack.Screen
            name="User Profile"
            component={UserProfile}
            options={{
              headerBackTitleVisible: false
            }}
          />
          <Stack.Screen
            name="SelectedChat"
            component={SelectedChatScreen}
            options={({route}) => ({
              title: route.params.nameOfUser,
              headerBackTitleVisible: false,
              headerShown: true
            })}
          />
          <Stack.Screen
            name="Seller"
            component={SellerPage}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsPage}
          />
          <Stack.Screen 
            name="Live Chat Support"
            component={LiveChatPage}
            options={{
              // headerShown: false,
              headerBackTitleVisible: false,
            }}
          />
        <Stack.Screen 
            name="Edit Saved Method of Payment"
            component={SavedPaymentPage}
            options={{
              // headerShown: false,
              headerBackTitleVisible: false,
            }}
          />
        </Stack.Navigator>
      </PaperProvider>
    );
  };

export default AppScreenStack;
