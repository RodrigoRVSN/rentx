import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.header};
  padding-top: 96px;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-bottom: 80px;
`;

export const Title = styled.Text`
  text-align: center;
  margin-top: 40px;
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.background_secondary};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
`;

export const Description = styled.Text`
  text-align: center;
  margin-top: 16px;
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.primary_400};
`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;
  margin: 80px 0;
`;
