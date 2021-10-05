import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { Splash } from "../screens/Splash";
import { SignIn } from "../screens/SignIn";
import { SignUpFirstStep } from "../screens/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "../screens/SignUp/SignUpSecondStep";
import { Confirmation } from "../screens/Confirmation";

export type RootStackAuthParamList = {
  Confirmation: undefined;
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: undefined;
};

const { Navigator, Screen } = createStackNavigator<RootStackAuthParamList>();

export function AuthStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Screen name="Splash" component={Splash} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
    </Navigator>
  );
}
