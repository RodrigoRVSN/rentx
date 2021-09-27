import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";

import { Container, Header, TotalCars, HeaderContent } from "./styles";

export const Home = () => {
  const carData = {
    brand: "Audi",
    name: "relampago",
    rent: {
      period: "AO DIA",
      price: 1870,
    },
    thumbnail:
      "https://img.elo7.com.br/feedback/attachments/DA522D/240x240/topper-fusquinha-preparativos-para-festa-de-1-aninho-do-meu-heitor-tag-papel-e-cia-1.jpg",
  };

  return (
    <Container>
      <StatusBar
        barStyle={"light-content"}
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <Car data={carData} />
      <Car data={carData} />
    </Container>
  );
};
