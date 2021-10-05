import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import { LoadAnimation } from "../../components/LoadAnimation";
import { RootStackAppParamList } from "../../routes/app.stack.routes";

type ScreenProp = StackNavigationProp<RootStackAppParamList, "Home">;

export const Home = () => {
  const navigation = useNavigation<ScreenProp>();
  const [carData, setCarData] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate<any>("CarDetails", { car });
  }

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
          {!loading && (
            <TotalCars>
              Total de{" "}
              {carData.length !== 1 ? `${carData.length} carros` : "1 carro"}{" "}
            </TotalCars>
          )}
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={carData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
};
