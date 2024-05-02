import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to check if user is logged in
  const checkLoginStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      const parsedUserData = JSON.parse(userData);

      if (parsedUserData && parsedUserData.access_token) {
        setUser(parsedUserData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to log in user
  const login = async (userData) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
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

  return (
    <AuthContext.Provider
      value={{ loading, login, logout, checkLoginStatus, getUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
