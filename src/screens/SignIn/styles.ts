import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_primary};
  padding: 0 32px;
`;

export const Header = styled.View`
  width: 100%;
  margin-top: ${getStatusBarHeight() + RFValue(80)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(40)}px;

  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
`;

export const Subtitle = styled.Text`
  margin-top: 15px;
  font-size: ${RFValue(15)}px;

  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
`;

export const Form = styled.View`
  margin: 64px 0;
  width: 100%;
`;

export const Footer = styled.View`
`;
