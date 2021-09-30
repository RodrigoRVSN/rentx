import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { Load } from "../../components/Load";

import { Container, Header, TotalCars, HeaderContent, CarList, ButtonMyCars } from "./styles";
import { RootStackParamList } from "../../routes/stack.routes";
import { StackNavigationProp } from "@react-navigation/stack";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components";

type ScreenProp = StackNavigationProp<RootStackParamList, "Home">;

export const Home = () => {
  const navigation = useNavigation<ScreenProp>();
  const [carData, setCarData] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    async function loadCars() {
      try {
        const response = await api.get("/cars");
        setCarData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadCars();
  }, []);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate<any>("CarDetails", { car });
  }

  function handleOpenMyCars() {
    navigation.navigate<any>("MyCars");
  }

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
      {loading ? (
        <Load />
      ) : (
        <CarList
          data={carData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <ButtonMyCars onPress={handleOpenMyCars}>
        <Ionicons name="car-sport-outline" size={24} color={theme.colors.background_secondary} />
      </ButtonMyCars>
    </Container>
  );
};
