import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabOne from "./../BottomTabOne";
import BottomTabThree from "./../BottomTabThree";
import BottomTabTwo from "./../BottomTabTwo";
import CustomTab from "./../CustomTab/CustomTab";

const Tab = createBottomTabNavigator();

const BottomTabLayout = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          display: "none",
        },
      }}
      tabBar={(props) => <CustomTab {...props} />}
    >
      <Tab.Screen
        name="TabOne"
        component={BottomTabOne}
        options={{
          title: "MY VEHICLE",
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="TabTwo"
        component={BottomTabTwo}
        options={{
          title: "ALERTS",
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="TABTHREE"
        component={BottomTabThree}
        options={{
          title: "MORE",
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabLayout;
