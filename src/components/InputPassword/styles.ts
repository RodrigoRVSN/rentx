import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";

interface InputProps {
  isFocused: boolean;
}

export const Container = styled.View<InputProps>`
  margin-bottom: 8px;
  flex-direction: row;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const IconContainer = styled.View`
  height: 56px;
  width: 55px;

  background-color: ${({ theme }) => theme.colors.background_secondary};
  margin-right: 2px;
  align-items: center;
  justify-content: center;
`;

export const InputContainer = styled(TextInput)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.header};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  padding: 0 23px;
`;
