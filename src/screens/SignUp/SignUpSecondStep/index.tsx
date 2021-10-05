import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import {
  Alert,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "styled-components";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { InputPassword } from "../../../components/InputPassword";

import {
  Container,
  Header,
  BulletContainer,
  Title,
  Subtitle,
  FormTitle,
  Form,
} from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/stack.routes";
import api from "../../../services/api";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

type ScreenProp = StackNavigationProp<RootStackParamList, "SignUpFirstStep">;

export function SignUpSecondStep() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigation = useNavigation<ScreenProp>();
  const theme = useTheme();
  const route = useRoute();
  const { user } = route.params as Params;

  async function handlePasswordSubmit() {
    if (!password || !passwordConfirm) {
      return Alert.alert("Ops", "Campo obrigatório.");
    }
    if (password !== passwordConfirm) {
      return Alert.alert("Ops", "Senhas diferentes.");
    }

    await api
      .post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      })
      .then(() => {
        navigation.navigate<any>("Confirmation", {
          title: "Conta criada!",
          description: "Seja bem-vindo(a)",
          routeName: "SignIn",
        });
      })
      .catch((err) => Alert.alert("Erro! ", err.message));
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <BackButton />
            <BulletContainer>
              <Bullet />
              <Bullet active />
            </BulletContainer>
          </Header>

          <Title>Crie sua {"\n"}conta</Title>
          <Subtitle>Faça seu cadastro de {"\n"}forma rápida e fácil.</Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <InputPassword
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <InputPassword
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handlePasswordSubmit}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
