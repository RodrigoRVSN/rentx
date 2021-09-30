import React from "react";
import { StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

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

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import { RootStackParamList } from "../../routes/stack.routes";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

type ScreenProp = StackNavigationProp<RootStackParamList, "Home">;

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation<ScreenProp>();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental() {
    navigation.navigate<any>("Scheduling", { car });
  }

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
        <ImageSlider imagesUrl={[car.photos[0]]} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car?.brand}</Brand>
            <Name>{car?.name}</Name>
          </Description>
          <Rent>
            <Frequency>{car?.rent.period}</Frequency>
            <Amount>R$ {car?.rent.price}</Amount>
          </Rent>
        </Details>

        <Accessories>
          {car?.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              icon={getAccessoryIcon(accessory.type)}
              name={accessory.name}
            />
          ))}
        </Accessories>

        <About>{car?.about}</About>
      </Content>

      <Footer>
        <Button
          title={"Escolher período de aluguel"}
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
