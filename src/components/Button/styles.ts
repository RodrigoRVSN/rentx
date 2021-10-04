import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ButtonProps {
  color: string;
}

interface TitleProps {
  light: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
  justify-content: center;
  align-items: center;
  padding: 19px;
  background-color: ${({ color }) => color};
  margin-bottom: 8px;
`;

export const Title = styled.Text<TitleProps>`
  color: ${({ theme, light }) =>
    light ? theme.colors.title : theme.colors.background_secondary};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
`;
