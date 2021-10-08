import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components/native";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

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
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/core";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

import { getPlatformDate } from "../../utils/getPlatformDate";
import { format } from "date-fns";
import api from "../../services/api";
import { RootStackAppParamList } from "../../routes/app.stack.routes";
import { useNetInfo } from "@react-native-community/netinfo";

type ScreenProp = StackNavigationProp<RootStackAppParamList, "Scheduling">;

interface Params {
  car: CarDTO;
  dates: string[];
  countScheduled: number;
}

interface RentalPeriodProps {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>(
    {} as RentalPeriodProps
  );
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<ScreenProp>();
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const netInfo = useNetInfo();
  const theme = useTheme();

  const route = useRoute();
  const { car, dates, countScheduled } = route.params as Params;

  const totalRental = (dates.length - countScheduled) * car.price;

  async function handleFinishRent() {
    setLoading(true);

    await api
      .post("/rentals", {
        user_id: 1,
        car_id: car.id,
        start_date: new Date(),
        end_date: new Date(),
        total: totalRental,
      })
      .then(() => {
        navigation.navigate<any>("Confirmation", {
          title: "Carro alugado!",
          description:
            "Agora você só precisa ir\naté a concessionária da RENTX",
          routeName: "Home",
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if (netInfo.isConnected) {
      fetchCarUpdated();
    }
  }, [netInfo]);

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={
            !!carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name numberOfLines={1}>{car.name}</Name>
          </Description>
          <Rent>
            <Frequency>Ao dia</Frequency>
            <Amount>R$ {car.price}</Amount>
          </Rent>
        </Details>

        {carUpdated.accessories && (
          <Accessories>
            {carUpdated.accessories.map((accessory) => (
              <Accessory
                key={accessory.type}
                icon={getAccessoryIcon(accessory.type)}
                name={accessory.name}
              />
            ))}
          </Accessories>
        )}

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
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </ScheduleInfo>
        <RentalInfo>
          <RentalDetails>
            <RentalTotal>TOTAL</RentalTotal>
            <RentalDetailsSchedule>{`R$ ${car.price} x${
              dates.length - countScheduled
            } diárias`}</RentalDetailsSchedule>
          </RentalDetails>
          <RentalAmount>R$ {totalRental}</RentalAmount>
        </RentalInfo>
      </Content>

      <Footer>
        <Button
          title={"Alugar agora"}
          color={theme.colors.success}
          onPress={handleFinishRent}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
