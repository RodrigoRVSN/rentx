import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { RFValue } from "react-native-responsive-fontsize";
import { StackNavigationProp } from "@react-navigation/stack";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { LoadAnimation } from "../../components/LoadAnimation";

import { CarDTO } from "../../dtos/CarDTO";
import { RootStackAppParamList } from "../../routes/app.stack.routes";
import { useNetInfo } from "@react-native-community/netinfo";

import api from "../../services/api";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../../database";
import { Car as ModelCar } from "../../database/model/Car";

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";

type ScreenProp = StackNavigationProp<RootStackAppParamList, "Home">;

export const Home = () => {
  const [carData, setCarData] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);
  
  const navigation = useNavigation<ScreenProp>();
  const netInfo = useNetInfo();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate<any>("CarDetails", { car });
  }
  
  async function offlineSynchronize(){
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        
        const response = await api
        .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
        
        const { changes, latestVersion } = response.data;
        return { changes, timestamp: latestVersion }
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('/users/sync', user);
      },
    });
  }

  useEffect(() => {
    let isMounted = true;

    async function loadCars() {
      try {
        const carCollection = database.get<ModelCar>("cars");
        const cars = await carCollection.query().fetch();

        if (isMounted) {
          setCarData(cars);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadCars();

    return () => {
      isMounted = false;
    };
  }, []);
  
  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]); 

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
