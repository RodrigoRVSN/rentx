import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  margin-bottom: 8px;
  flex-direction: row;
`;

export const IconContainer = styled.View<Props>`
  height: 56px;
  width: 55px;

  background-color: ${({ theme }) => theme.colors.background_secondary};
  margin-right: 2px;
  align-items: center;
  justify-content: center;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const InputContainer = styled(TextInput)<Props>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.header};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  padding: 0 23px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`;
