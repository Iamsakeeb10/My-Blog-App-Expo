import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [fullNameData, setFullNameData] = useState();
  const [updatedEmail, setUpdatedEmail] = useState(null);

  // Function to check if user is logged in
  const checkLoginStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      const parsedUserData = JSON.parse(userData);

      // console.log("---userdata", userData);

      if (parsedUserData && parsedUserData.access_token) {
        setUser(parsedUserData);
      }
      return parsedUserData;
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

  const fullNameDataFunc = (data) => {
    const newName = data?.data?.name;
    setFullNameData(newName);
  };

  // New email function
  const getUpdatedEmail = (updatedEmail) => {
    setUpdatedEmail(updatedEmail);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        checkLoginStatus,
        getUserData,
        user,
        fullNameDataFunc,
        fullNameData,
        getUpdatedEmail,
        updatedEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
