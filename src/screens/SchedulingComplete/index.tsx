import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";

import DoneSvg from "../../assets/done.svg";
import LogoSvg from "../../assets/logo_background_gray.svg";
import { ConfirmButton } from "../../components/ConfirmButton";
import { RootStackParamList } from "../../routes/stack.routes";

import { Container, Content, Title, Description, Footer } from "./styles";

type ScreenProp = StackNavigationProp<RootStackParamList, "Scheduling">;

export function SchedulingComplete() {
  const navigation = useNavigation<ScreenProp>();
  const { width } = useWindowDimensions();

  function handleOkConfirm() {
    navigation.navigate("Home");
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
        <Title>Carro alugado!</Title>
        <Description>
          Agora você só precisa ir {"\n"}
          até a concessionária da RENTX {"\n"}
          pegar o seu automóvel.
        </Description>
      </Content>
      <Footer>
        <ConfirmButton title={"OK"} onPress={handleOkConfirm} />
      </Footer>
    </Container>
  );
}
