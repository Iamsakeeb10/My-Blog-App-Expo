import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [fullNameData, setFullNameData] = useState();
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [profileData, setProfileData] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    setUploadedImage(null);
  }, [user]);

  const checkLoginStatus = useCallback(async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      const parsedUserData = JSON.parse(userData);

      if (
        parsedUserData &&
        parsedUserData.access_token &&
        parsedUserData.expires_in &&
        parsedUserData.timestamp
      ) {
        const currentTime = Date.now();
        const tokenObtainedTime = parsedUserData.timestamp;
        const expiredIn = parsedUserData.expires_in * 1000;

        if (currentTime < tokenObtainedTime + expiredIn) {
          setUser(parsedUserData);

          const storedProfileData = await AsyncStorage.getItem("profileData");
          if (storedProfileData) {
            setProfileData(JSON.parse(storedProfileData));
          }

          return parsedUserData;
        }
      }
      return null;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const login = useCallback(async (userData) => {
    try {
      const timestamp = Date.now();
      const userDataWithTimeStamp = { ...userData, timestamp };
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify(userDataWithTimeStamp)
      );
      setUser(userData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.clear();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getUserData = useCallback(() => {
    return user;
  }, [user]);

  const fullNameDataFunc = useCallback((data) => {
    const newName = data?.data?.name;
    setFullNameData(newName);
  }, []);

  const getProfileData = useCallback(async (profileData) => {
    try {
      await AsyncStorage.setItem("profileData", JSON.stringify(profileData));
      setProfileData(profileData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getUpdatedEmail = (enteredEmail) => {
    setUpdatedEmail(enteredEmail);
  };

  const getUploadedImage = (image) => {
    setUploadedImage(image);
  };

  const contextValue = useMemo(
    () => ({
      login,
      logout,
      checkLoginStatus,
      getUserData,
      user,
      fullNameDataFunc,
      fullNameData,
      getProfileData,
      profileData,
      updatedEmail,
      getUpdatedEmail,
      getUploadedImage,
      uploadedImage,
    }),
    [
      login,
      logout,
      checkLoginStatus,
      getUserData,
      user,
      fullNameDataFunc,
      fullNameData,
      getProfileData,
      profileData,
      updatedEmail,
      getUpdatedEmail,
      getUploadedImage,
      uploadedImage,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
