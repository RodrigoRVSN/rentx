import React from "react";
import { Container } from "./styles";

import LottieView from "lottie-react-native";

import loading_animated from "../../assets/loading_animated.json";

export function LoadAnimation() {
  return (
    <Container>
      <LottieView source={loading_animated} autoPlay style={{ height: 200 }} loop/>
    </Container>
  );
}
