import { useNavigation, useRoute } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";

import DoneSvg from "../../assets/done.svg";
import LogoSvg from "../../assets/logo_background_gray.svg";
import { ConfirmButton } from "../../components/ConfirmButton";
import { RootStackAppParamList } from "../../routes/app.stack.routes";

import { Container, Content, Title, Description, Footer } from "./styles";

interface Params {
  title: string;
  description: string;
  routeName: string;
}

type ScreenProp = StackNavigationProp<RootStackAppParamList, "Scheduling">;

export function Confirmation() {
  const navigation = useNavigation<ScreenProp>();
  const { width } = useWindowDimensions();
  const route = useRoute();
  const { title, description, routeName } = route.params as Params;

  function handleOkConfirm() {
    navigation.navigate<any>(routeName);
  }

  return (
    <Container>
      <StatusBar
        barStyle={"light-content"}
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
      <Footer>
        <ConfirmButton title={"OK"} onPress={handleOkConfirm} />
      </Footer>
    </Container>
  );
}
