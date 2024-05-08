import "react-native-gesture-handler";
import React, { useContext, useEffect } from "react";
import { Alert, StyleSheet, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppScreenStack from "./components/AppScreenStack";
import { DrawerContent } from "./components/DrawerContent";
import SettingsPage from "./pages/SettingsPage";
import OrdersPage from "./pages/OrdersPage";
import SellingPage from './pages/SellingPage'
import AuthStackScreen from "./pages/AuthScreenStack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StripeProvider } from "@stripe/stripe-react-native";
import { CartProvider, CartContext } from "./components/CartContext";
import AdminScreenStack from "./pages/pages_admin/AdminScreenStack";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

const ChatNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Conversations">
      <Stack.Screen name="Conversations" component={Conversations} />
      <Stack.Screen name="ChatDetails" component={ChatDetails} />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

import axios from "axios";
import { AuthContext } from "./components/context";
import configs from "./config";
import { CometChat } from "@cometchat-pro/react-native-chat";
import useUserStore from "./components/UserContext";

const COMETCHAT_APPID = "25579388a65f32e7";
const COMETCHAT_AUTHKEY = "dca323479e4634f3626d04753a10521f35a5c1cc";
const STRIPE_KEY =
  "pk_test_51Oe7muAh9NlzJ6kblOAtWXQxbJVim5q4EddknofdzrUzG9kWcvGP8JshwEwoafCskVAwtdzHaXwK0FKypiMgS0zl00AICSn8NI";

let region = "US";
let appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .autoEstablishSocketConnection(true)
  .build();
CometChat.init(COMETCHAT_APPID, appSetting).then(
  () => {
    console.log("Initialization completed successfully");
  },
  (error) => {
    console.log("Initialization failed with error:", error);
  }
);

const App = () => {
  // initial login state variables
  const initialLoginState = {
    isLoading: true,
    username: null,
    userToken: null,
  };

  const API_URL = configs[0].API_URL;

  const loginReducer = (previousState, event) => {
    switch (event.type) {
      case "GET_TOKEN":
        return {
          ...previousState,
          userToken: event.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...previousState,
          username: event.id,
          userToken: event.token,
          pwd: event.pwd,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...previousState,
          username: null,
          userToken: null,
          isLoading: false,
        };
      case "SIGNUP":
        return {
          ...previousState,
          username: event.id,
          userToken: event.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const setUserID = useUserStore((state) => state.updateUserID);
  const setFirstName = useUserStore((state) => state.updateFirstName);
  const setLastName = useUserStore((state) => state.updateLastName);
  const setUsername = useUserStore((state) => state.updateUsername);
  const setEmail = useUserStore((state) => state.updateEmail);
  const clearUserInfo = useUserStore((state) => state.clearUserInfo);

  const authContext = React.useMemo(
    () => ({
      SignUp: async (
        fName,
        lName,
        username,
        email,
        phoneNumber,
        pass,
        confirmPass
      ) => {
        let userToken, res;
        userToken = null;

        try {
          console.log(
            "In SIGNUP w/ ",
            fName,
            lName,
            username,
            email,
            phoneNumber,
            pass,
            confirmPass
          );

          if (!email.includes("@")) {
            Alert.alert("Invalid Email", "Please use a valid email address!");
          } else if (pass.length < 8) {
            alert(
              "Password Length Too Short",
              "Password needs to be at least 8 characters in length!"
            );
          } else if (pass != confirmPass) {
            alert("Password Mismatch", "Make sure password's are identical!");
          } else {
            res = await axios.post(API_URL + "/user/signUp", {
              firstName: fName,
              lastName: lName,
              username: username,
              emailAddress: email,
              phoneNum: phoneNumber,
              password: pass,
            });

            if (res.data == "ERROR: please enter correct sign up details.") {
              alert("Error in signup details.  Please check and try again!");
            } else {
              userToken = "randomToken";
              AsyncStorage.setItem("userToken", userToken);
              AsyncStorage.setItem("userID", String(res.data[0].userID));
              AsyncStorage.setItem("FirstName", res.data[0].firstName);
              AsyncStorage.setItem("LastName", res.data[0].lastName);
              AsyncStorage.setItem("Username", res.data[0].username);
              AsyncStorage.setItem("Email", res.data[0].emailAddress);

						setUserID(res.data[0][0].userID);
						setFirstName(fName);
						setLastName(lName);
						setUsername(username);
						setEmail(email);
  
            let user = new CometChat.User(String(res.data[0][0].userID));
            user.setName(`${fName} ${lName}`)

            CometChat.createUser(user, COMETCHAT_AUTHKEY).then(
              user => {
                  console.log("comet chat user created", user);
              }, error => {
                  console.log("comet chat user creation error ", error);
              }
            );
            CometChat.login(String(res.data[0][0].userID), COMETCHAT_AUTHKEY).then(
              (user) => {
                console.log("Login Successful:", { user });
              },
              (error) => {
                console.log("Login failed with exception:", { error });
              }
            );


					}
					console.log(res.data[0]);
				}
			} catch(error) {
				console.error(error);
			}
        	dispatch({ type: 'SIGNUP', id: username, token: userToken });
		},
    	Login: async (username, password) => {
        	let userToken;
        	userToken = null;
			
			console.log(API_URL + '/user/login');

        try {
          const res = await axios.post(API_URL + "/user/login", {
            username: username,
            password: password,
          });
          console.log(res.data);

          if (username == "admin" && password == "AdminP@ss2024!") {
            userToken = "adminToken";
            AsyncStorage.setItem("userToken", userToken);
            AsyncStorage.setItem("userID", String(res.data[0].userID));
            AsyncStorage.setItem("FirstName", res.data[0].firstName);
            AsyncStorage.setItem("LastName", res.data[0].lastName);
            AsyncStorage.setItem("Username", res.data[0].username);
            AsyncStorage.setItem("Email", res.data[0].emailAddress);
          } else if (
            res.data == "Wrong password found in API!" ||
            res.data == "Error logging in!"
          ) {
            alert(
              "Please check your login information.  Username and/or password are incorrect!"
            );
          } else {
            userToken = "randomUserToken";
            AsyncStorage.setItem("userToken", userToken);
            AsyncStorage.setItem("userID", String(res.data[0].userID));
            AsyncStorage.setItem("FirstName", res.data[0].firstName);
            AsyncStorage.setItem("LastName", res.data[0].lastName);
            AsyncStorage.setItem("Username", res.data[0].username);
            AsyncStorage.setItem("Email", res.data[0].emailAddress);
            setUserID(res.data[0].userID);
            useUserStore.getState().updateUserID(res.data[0].userID);
            setFirstName(res.data[0].firstName);
            setLastName(res.data[0].lastName);
            setUsername(res.data[0].username);
            setEmail(res.data[0].emailAddress);

            CometChat.getLoggedinUser().then(
              (user) => {
                if (!user) {
                  CometChat.login(res.data[0].userID, COMETCHAT_AUTHKEY).then(
                    (user) => {
                      console.log("Login Successful:", { user });
                    },
                    (error) => {
                      console.log("Login failed with exception:", { error });
                    }
                  );
                }
              },
              (error) => {
                console.log("Some Error Occured", { error });
              }
            );
          }
        } catch (error) {
          console.log(error);
        }
        dispatch({
          type: "LOGIN",
          id: username,
          token: userToken,
          pwd: password,
        });
      },
      SignOut: async () => {
        try {
          // set random token currently, but pull from db once API developed
          userToken = "random";
          CometChat.logout();
          await AsyncStorage.removeItem("userToken");

          clearUserInfo();
        } catch (e) {
          console.log(e);
        }

        dispatch({ type: "LOGOUT" });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken", userToken);
      } catch (e) {
        console.log("ERROR: ", e);
      }
      dispatch({ type: "GET_TOKEN", token: userToken });
    }, 1000);
  }, []);

  // Define the function to fetch user details
  const fetchUserDetails = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    if (userToken) {
      try {
        zustUserID = await AsyncStorage.getItem("userID");
        zustFirstName = await AsyncStorage.getItem("FirstName");
        zustLastName = await AsyncStorage.getItem("LastName");
        zustEmail = await AsyncStorage.getItem("Email");
        zustUsername = await AsyncStorage.getItem("Username");

        setUserID(zustUserID);
        setFirstName(zustFirstName);
        setLastName(zustLastName);
        setUsername(zustUsername);
        setEmail(zustEmail);
      } catch (error) {
        console.log("Error fetching user details:", error);
      }
    }
  };

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        dispatch({ type: "GET_TOKEN", token: userToken });
      }
      fetchUserDetails(); // Also fetch user details on app load
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        <StripeProvider publishableKey={STRIPE_KEY}>
          <CartProvider>
            {/* <UserContext> */}
            <NavigationContainer>
              {(() => {
                // console.log(loginState.userToken);
                if (loginState.userToken == "adminToken") {
                  console.log("Admin signed in.");
                  return <AdminScreenStack />;
                } else if (loginState.userToken != null) {
                  // Drawer container - if user logged in
                  return (
                    <Drawer.Navigator
                      drawerContent={(props) => <DrawerContent {...props} />}
                    >
                      <Drawer.Screen name="Drift" component={AppScreenStack} />
                      <Drawer.Screen name="Settings" component={SettingsPage} />
                      <Drawer.Screen name="Orders" component={OrdersPage} />
                      <Drawer.Screen name="Selling" component={SellingPage} />
                    </Drawer.Navigator>
                  );
                } else {
                  // signup/login screen stack
                  return <AuthStackScreen />;
                }
              })()}
            </NavigationContainer>
            {/* </UserContext> */}
          </CartProvider>
        </StripeProvider>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3962FF",
    alignItems: "center",
    justifyContent: "center",
  },
});
