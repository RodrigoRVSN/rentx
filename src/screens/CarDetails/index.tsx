import React from "react";
import { StatusBar } from "react-native";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import accelerationSvg from "../../assets/acceleration.svg";
import energySvg from "../../assets/energy.svg";
import exchangeSvg from "../../assets/exchange.svg";
import gasolineSvg from "../../assets/gasoline.svg";
import forceSvg from "../../assets/force.svg";
import speedSvg from "../../assets/speed.svg";

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
  About,
  Accessories,
  Footer,
} from "./styles";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

export function CarDetails() {
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

        <About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide
          indultado na praça Real Maestranza de Sevilla. É um belíssimo carro
          para quem gosta de acelerar.
        </About>
      </Content>

      <Footer>
        <Button title={"Escolher período de aluguel"} />
      </Footer>
    </Container>
  );
}
