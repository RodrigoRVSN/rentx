import React, { useState, useEffect } from "react";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import { Load } from "../../components/Load";
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

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export const MyCars = () => {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/schedules_byuser?user_id=1");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
              <BackButton
                onPress={() => {}}
                color={theme.colors.background_secondary}
              />
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
                keyExtractor={(item) => String(item.startDate)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <CarWrapper>
                    <Car data={item.car} />
                    <CarFooter>
                      <CarFooterTitle>PERÍODO</CarFooterTitle>
                      <CarDateWrapper>
                        <CarDate>{item.startDate}</CarDate>
                        <AntDesign
                          name="arrowright"
                          size={20}
                          color={theme.colors.title}
                          style={{ marginHorizontal: 10 }}
                        />
                        <CarDate>{item.endDate}</CarDate>
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
