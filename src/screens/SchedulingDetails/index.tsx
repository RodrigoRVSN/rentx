import React from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components/native";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import accelerationSvg from "../../assets/acceleration.svg";
import energySvg from "../../assets/energy.svg";
import exchangeSvg from "../../assets/exchange.svg";
import gasolineSvg from "../../assets/gasoline.svg";
import forceSvg from "../../assets/force.svg";
import speedSvg from "../../assets/speed.svg";
import ArrowSvg from "../../assets/arrow.svg";
import { Feather } from "@expo/vector-icons";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Frequency,
  Amount,
  Accessories,
  Footer,
  ScheduleInfo,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalInfo,
  RentalDetails,
  RentalTotal,
  RentalDetailsSchedule,
  RentalAmount,
} from "./styles";
import { RFValue } from "react-native-responsive-fontsize";

export function SchedulingDetails() {
  const theme = useTheme();

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={[
            "https://img.elo7.com.br/feedback/attachments/DA522D/240x240/topper-fusquinha-preparativos-para-festa-de-1-aninho-do-meu-heitor-tag-papel-e-cia-1.jpg",
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>
          <Rent>
            <Frequency>Ao dia</Frequency>
            <Amount>R$ 580</Amount>
          </Rent>
        </Details>

        <Accessories>
          <Accessory icon={speedSvg} name={"380km/h"} />
          <Accessory icon={accelerationSvg} name={"380km/h"} />
          <Accessory icon={energySvg} name={"380km/h"} />
          <Accessory icon={accelerationSvg} name={"380km/h"} />
          <Accessory icon={accelerationSvg} name={"380km/h"} />
          <Accessory icon={accelerationSvg} name={"380km/h"} />
        </Accessories>

        <ScheduleInfo>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>
        </ScheduleInfo>

        <RentalInfo>
          <RentalDetails>
            <RentalTotal>TOTAL</RentalTotal>
            <RentalDetailsSchedule>R$ 580 x3 diárias</RentalDetailsSchedule>
          </RentalDetails>
          <RentalAmount>R$ 2.900</RentalAmount>
        </RentalInfo>
      </Content>

      <Footer>
        <Button title={"Alugar agora"} color={theme.colors.success} />
      </Footer>
    </Container>
  );
}
