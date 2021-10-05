import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Alert,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { RootStackParamList } from "../../../routes/stack.routes";

import * as Yup from "yup";

import {
  Container,
  Header,
  BulletContainer,
  Title,
  Subtitle,
  FormTitle,
  Form,
} from "./styles";

type ScreenProp = StackNavigationProp<RootStackParamList, "SignUpFirstStep">;

export function SignUpFirstStep() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicense, setDriverLicense] = useState("");

  const navigation = useNavigation<ScreenProp>();

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("O CNH é obrigatório!"),
        email: Yup.string()
          .required("O nome é obrigatório!")
          .email("E-mail inválido"),
        name: Yup.string().required("O nome é obrigatório!"),
      });

      const data = { name, email, driverLicense };
      await schema.validate(data);
      navigation.navigate<any>("SignUpSecondStep", { user: data });
    } catch (error) {
      Alert.alert("Eita", error.message);
    }
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
              <Bullet active />
              <Bullet />
            </BulletContainer>
          </Header>

          <Title>Crie sua {"\n"}conta</Title>
          <Subtitle>Faça seu cadastro de {"\n"}forma rápida e fácil.</Subtitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              value={name}
              onChangeText={setName}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize={"none"}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="number-pad"
              value={driverLicense}
              onChangeText={setDriverLicense}
            />
          </Form>

          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
