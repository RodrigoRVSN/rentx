import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "styled-components";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { InputPassword } from "../../components/InputPassword";
<<<<<<< HEAD
import { RootStackParamList } from "../../routes/stack.routes";
=======

import * as Yup from "yup";

>>>>>>> c8324fd2db91e4c7d24029092684fb5a75dedbe0
import { Container, Header, Title, Subtitle, Footer, Form } from "./styles";

type ScreenProp = StackNavigationProp<RootStackParamList, "SignUpFirstStep">;

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<ScreenProp>();
  const theme = useTheme();

<<<<<<< HEAD
  function handleCreateAccount() {
    navigation.navigate("SignUpFirstStep");
=======
  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido!"),
        password: Yup.string()
          .required("Senha obrigatória")
          .min(6, "A senha deve ter no mínimo 6 dígitos."),
      });
      await schema.validate({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Eita", error.message);
      } else {
        Alert.alert("Opa", "Erro nas creddenciais.");
      }
    }
>>>>>>> c8324fd2db91e4c7d24029092684fb5a75dedbe0
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />

          <Header>
            <Title>Estamos {"\n"}quase lá.</Title>
            <Subtitle>
              Faça seu login para começar {"\n"}
              uma experiência incrível.
            </Subtitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <InputPassword
              iconName="lock"
              placeholder="Senha"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />
            <Button
              title="Criar conta gratuita"
              onPress={() => {
                handleCreateAccount();
              }}
              enabled={true}
              loading={false}
              color={theme.colors.shape}
              light={true}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
