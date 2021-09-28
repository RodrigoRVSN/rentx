import React from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";

import ArrowSvg from "../../assets/arrow.svg";
import {
  Container,
  Header,
  Title,
  RentalInfo,
  DateInfo,
  DateTitle,
  ValueInfo,
  DateValue,
  Content,
  Footer,
} from "./styles";
import { RootStackParamList } from "../../routes/stack.routes";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/core";

type ScreenProp = StackNavigationProp<RootStackParamList, "Scheduling">;

export function Scheduling() {
  const navigation = useNavigation<ScreenProp>();
  const theme = useTheme();

  function handleConfirmRental() {
    navigation.navigate("SchedulingDetails");
  }

  return (
    <Container>
      <Header>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <BackButton
          onPress={() => {}}
          color={theme.colors.background_secondary}
        />
        <Title>
          Escolha uma {"\n"}data de início e {"\n"}fim do aluguel
        </Title>
        <RentalInfo>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <ValueInfo selected={false}>
              <DateValue>18/06/2021</DateValue>
            </ValueInfo>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <ValueInfo selected={false}>
              <DateValue>18/06/2021</DateValue>
            </ValueInfo>
          </DateInfo>
        </RentalInfo>
      </Header>

      <Content>
        <Calendar />
      </Content>
      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
