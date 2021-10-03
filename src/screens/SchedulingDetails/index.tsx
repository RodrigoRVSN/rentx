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
import { RootStackParamList } from "../../routes/stack.routes";
import { useNavigation, useRoute } from "@react-navigation/core";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

import { getPlatformDate } from "../../utils/getPlatformDate";
import { format } from "date-fns";
import api from "../../services/api";

type ScreenProp = StackNavigationProp<RootStackParamList, "Scheduling">;

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
  const theme = useTheme();

  const route = useRoute();
  const { car, dates, countScheduled } = route.params as Params;

  const totalRental = dates.length * car.rent.price;

  async function handleFinishRent() {
    setLoading(true);
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    await api.post(`/schedules_byuser`, {
      car,
      user_id: 1,
      startDate: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      endDate: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
        startDate: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
        endDate: format(
          getPlatformDate(new Date(dates[dates.length - 1])),
          "dd/MM/yyyy"
        ),
      })
      .then(() => {
        navigation.navigate("SchedulingComplete");
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
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Frequency>Ao dia</Frequency>
            <Amount>R$ {car.rent.price}</Amount>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              icon={getAccessoryIcon(accessory.type)}
              name={accessory.name}
            />
          ))}
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
            <RentalDetailsSchedule>{`R$ ${car.rent.price} x${dates.length - countScheduled} diárias`}</RentalDetailsSchedule>
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
