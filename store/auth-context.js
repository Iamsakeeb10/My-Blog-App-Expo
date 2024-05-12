import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  checkLoginStatus: () => {},
  getUserData: () => null,
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log("user------", user);

  // Function to check if user is logged in
  const checkLoginStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      const parsedUserData = JSON.parse(userData);

      // console.log("---userdata", userData);

      if (parsedUserData && parsedUserData.access_token) {
        setUser(parsedUserData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to log in user
  const login = async (userData) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(userData));

      // console.log("setting data -----", userData);

      setUser(userData);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to log out user
  const logout = async () => {
    try {
      await AsyncStorage.clear();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to get user data
  const getUserData = () => {
    return user;
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, checkLoginStatus, getUserData, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
