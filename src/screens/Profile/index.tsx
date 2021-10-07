import React, { useState } from "react";
import { BackButton } from "../../components/BackButton";
import { Feather } from "@expo/vector-icons";

import {
  Container,
  Header,
  HeaderContent,
  Title,
  SignOutButton,
  Photo,
  PhotoContainer,
  PictureButton,
  Content,
  SelectOptionContainer,
  SelectOption,
  Option,
} from "./styles";
import { useTheme } from "styled-components";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/auth";
import { Button } from "../../components/Button";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";

export function Profile() {
  const { user, signOut, updatedUser } = useAuth();
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);
  const [avatar, setAvatar] = useState(user.avatar);
  const [option, setOption] = useState<"dataProfile" | "changePassword">(
    "dataProfile"
  );
  const theme = useTheme();

  function handleChangeOption(
    optionSelected: "dataProfile" | "changePassword"
  ) {
    setOption(optionSelected);
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  }

  async function handleUpdateUser() {
    try {
      const schema = Yup.object({
        driverLicense: Yup.number().required("CNH é obrigatória!"),
        name: Yup.string().required("Nome é obrigatório!"),
      });

      const data = { driverLicense, name };
      await schema.validate(data);

      await updatedUser({
        name,
        driver_license: driverLicense,
        avatar: avatar,
        email: user.email,
        id: user.id,
        token: user.token,
        user_id: user.user_id,
      });

      Alert.alert("Feito!");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Eita!", error.message);
      }
      throw new Error();
    }
  }

  async function handleSignOut() {
    Alert.alert(
      "Tem certeza?",
      "Se você sair precisará de internet para se reconectar.",
      [
        { text: "Cancelar", onPress: () => {} },
        { text: "Sair", onPress: () => signOut() },
      ]
    );
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderContent>
              <BackButton />
              <Title>Editar Perfil</Title>
              <SignOutButton onPress={handleSignOut}>
                <Feather
                  name="power"
                  size={20}
                  color={theme.colors.text_detail}
                />
              </SignOutButton>
            </HeaderContent>

            <PhotoContainer>
              {!!avatar && <Photo source={{ uri: avatar }} />}
              <PictureButton onPress={handleAvatarSelect}>
                <Feather
                  name="camera"
                  size={20}
                  color={theme.colors.background_secondary}
                />
              </PictureButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <SelectOptionContainer>
              <SelectOption
                active={option === "dataProfile"}
                onPress={() => handleChangeOption("dataProfile")}
              >
                <Option active={option === "dataProfile"}>Dados</Option>
              </SelectOption>

              <SelectOption
                active={option === "changePassword"}
                onPress={() => handleChangeOption("changePassword")}
              >
                <Option active={option === "changePassword"}>
                  Trocar senha
                </Option>
              </SelectOption>
            </SelectOptionContainer>

            {option === "dataProfile" ? (
              <>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCapitalize="sentences"
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input
                  iconName="mail"
                  placeholder="voce@mail.com"
                  autoCapitalize="none"
                  defaultValue={user.email}
                  editable={false}
                />
                <Input
                  iconName="credit-card"
                  placeholder="Licença de motorista"
                  keyboardType="number-pad"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </>
            ) : (
              <>
                <Input
                  iconName="lock"
                  placeholder="Senha atual"
                  autoCapitalize="none"
                />
                <Input
                  iconName="lock"
                  placeholder="Senha"
                  autoCapitalize="none"
                />
                <Input
                  iconName="lock"
                  placeholder="Repetir senha"
                  autoCapitalize="none"
                />
              </>
            )}
            <Button title="Atualizar cadastro" onPress={handleUpdateUser} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
