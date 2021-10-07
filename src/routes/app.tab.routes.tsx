import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "../screens/Home";
import { MyCars } from "../screens/MyCars";

import { AppStackRoutes } from "./app.stack.routes";

export type RootTabAppParamList = {
  First: undefined;
  Profile: undefined;
  MyCars: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<RootTabAppParamList>();

import HomeSvg from "../assets/home.svg";
import CarSvg from "../assets/car.svg";
import PeopleSvg from "../assets/people.svg";
import { useTheme } from "styled-components";
import { Platform } from "react-native";
import { Profile } from "../screens/Profile";

export function AppTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarActiveTintColor: theme.colors.main,
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 60,
          backgroundColor: theme.colors.background_secondary,
        },
      }}
    >
      <Screen
        name="First"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <PeopleSvg width={24} height={24} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
}
