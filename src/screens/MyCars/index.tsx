import React, { useState, useEffect } from "react";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import { FlatList, StatusBar } from "react-native";
import { BackButton } from "../../components/BackButton";
import { useTheme } from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsCount,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarDateWrapper,
  CarDate,
} from "./styles";
import { Car } from "../../components/Car";
import { LoadAnimation } from "../../components/LoadAnimation";
import { Car as ModelCar } from "../../database/model/Car";
import { format, parseISO } from "date-fns";
import { useIsFocused } from "@react-navigation/core";

interface DataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export const MyCars = () => {
  const [cars, setCars] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/rentals");
        const dataFormatted = response.data.map((data: DataProps) => {
          return {
            car: data.car,
            start_date: format(parseISO(data.start_date), "dd/MM/yyyy"),
            end_date: format(parseISO(data.end_date), "dd/MM/yyyy"),
          };
        });
        setCars(dataFormatted);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isFocused]);

  return (
    <>
      {loading ? (
        <LoadAnimation />
      ) : (
        <>
          <Container>
            <Header>
              <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
              />
              <BackButton color={theme.colors.background_secondary} />
              <Title>
                Seus agendamentos, {"\n"}
                estão aqui.
              </Title>
              <Subtitle>Conforto, segurança e praticidade.</Subtitle>
            </Header>

            <Content>
              <Appointments>
                <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                <AppointmentsCount>{cars.length}</AppointmentsCount>
              </Appointments>
              <FlatList
                data={cars}
                keyExtractor={(item) => String(item.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <CarWrapper>
                    <Car data={item.car} />
                    <CarFooter>
                      <CarFooterTitle>PERÍODO</CarFooterTitle>
                      <CarDateWrapper>
                        <CarDate>{item.start_date}</CarDate>
                        <AntDesign
                          name="arrowright"
                          size={20}
                          color={theme.colors.title}
                          style={{ marginHorizontal: 10 }}
                        />
                        <CarDate>{item.end_date}</CarDate>
                      </CarDateWrapper>
                    </CarFooter>
                  </CarWrapper>
                )}
              />
            </Content>
          </Container>
        </>
      )}
    </>
  );
};
