import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { SchedulingComplete } from "../screens/SchedulingComplete";
import { MyCars } from "../screens/MyCars";
import { Splash } from "../screens/Splash";
import { SignIn } from "../screens/SignIn";

export type RootStackParamList = {
  Home: undefined;
  CarDetails: undefined;
  Scheduling: undefined;
  SchedulingDetails: undefined;
  SchedulingComplete: undefined;
  MyCars: undefined;
  Splash: undefined;
  SignIn: undefined;
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SignIn"
    >
      <Screen name="Splash" component={Splash} />
      <Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }}
      />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
      <Screen name="MyCars" component={MyCars} />
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
}
