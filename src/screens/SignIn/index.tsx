import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Keyboard, KeyboardAvoidingView, StatusBar } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "styled-components";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { InputPassword } from "../../components/InputPassword";
import { RootStackParamList } from "../../routes/stack.routes";
import { Container, Header, Title, Subtitle, Footer, Form } from "./styles";

type ScreenProp = StackNavigationProp<RootStackParamList, "SignUpFirstStep">;

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<ScreenProp>();
  const theme = useTheme();

  function handleCreateAccount() {
    navigation.navigate("SignUpFirstStep");
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
              onPress={() => {}}
              enabled={false}
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
