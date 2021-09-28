import styled, { css } from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

interface DateValueProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled.View`
  height: ${RFValue(325)}px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.header};
  justify-content: center;
  padding: 25px;
  padding-top: ${getStatusBarHeight() + 50}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(34)}px;
  margin-top: 24px;
`;

export const RentalInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 32px 0;
`;

export const DateInfo = styled.View`
  width: 35%;
`;

export const DateTitle = styled.Text`
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
`;

export const DateValue = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.background_secondary};
  font-family: ${({ theme }) => theme.fonts.primary_500};
`;

export const ValueInfo = styled.View<DateValueProps>`
  ${({ selected, theme }) =>
    !selected &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${theme.colors.text};
    `}
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: { paddingBottom: 24 },
  showsVerticalScrollIndicator: false,
})``;

export const Footer = styled.View`
  padding: 24px;
`;
