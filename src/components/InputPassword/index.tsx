import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { Container, IconContainer, InputContainer } from "./styles";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { BorderlessButton } from "react-native-gesture-handler";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function InputPassword({ iconName, value, ...rest }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const theme = useTheme();

  function inputOnFocus() {
    setIsFocused(true);
  }

  function inputOnBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handleVisibilityChange() {
    setIsPasswordVisible((oldState) => !oldState);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={isFocused || isFilled ? theme.colors.main : theme.colors.text}
        />
      </IconContainer>

      <InputContainer
        {...rest}
        secureTextEntry={!isPasswordVisible}
        onBlur={inputOnBlur}
        onFocus={inputOnFocus}
        isFocused={isFocused}
      />

      <BorderlessButton onPress={handleVisibilityChange}>
        <IconContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}
