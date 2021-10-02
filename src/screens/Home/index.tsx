import React, { useEffect, useState } from "react";
import { BackHandler, StatusBar, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
} from "./styles";
import { RootStackParamList } from "../../routes/stack.routes";
import { StackNavigationProp } from "@react-navigation/stack";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler, RectButton } from "react-native-gesture-handler";
import { LoadAnimation } from "../../components/LoadAnimation";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

type ScreenProp = StackNavigationProp<RootStackParamList, "Home">;

export const Home = () => {
  const navigation = useNavigation<ScreenProp>();
  const [carData, setCarData] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = event.translationX + ctx.positionX;
      positionY.value = event.translationY + ctx.positionY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  function handleCarDetails(car: CarDTO) {
    navigation.navigate<any>("CarDetails", { car });
  }

  function handleOpenMyCars() {
    navigation.navigate<any>("MyCars");
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

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
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

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[myCarsAnimated, style.myCarView]}>
          <ButtonAnimated
            onPress={handleOpenMyCars}
            style={[style.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              name="car-sport-outline"
              size={24}
              color={theme.colors.background_secondary}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
};

const style = StyleSheet.create({
  myCarView: {
    position: "absolute",
    bottom: 13,
    right: 22,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
