import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface OptionProps {
  active: boolean;
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  padding: 0 21px;
  width: 100%;
  height: ${RFValue(227)}px;
  background-color: ${({ theme }) => theme.colors.header};
  align-items: center;
`;

export const HeaderContent = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${getStatusBarHeight() + 30}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.background_secondary};
`;

export const SignOutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
  height: 180px;
  width: 180px;
  border-radius: 90px;

  background-color: ${({ theme }) => theme.colors.text_detail};
  margin-top: 47px;
`;

export const Photo = styled.Image`
  height: 180px;
  width: 180px;
  border-radius: 90px;
`;

export const PictureButton = styled(RectButton)`
  height: 40px;
  width: 40px;
  border-radius: 20px;

  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.main};

  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export const Content = styled.View`
  padding: 0 24px;
  margin-top: 122px;
`;

export const SelectOptionContainer = styled.View`
  width: 100%;
  flex-direction: row;

  margin-bottom: 24px;

  justify-content: space-around;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
`;

export const SelectOption = styled.TouchableOpacity<OptionProps>`
  padding-bottom: 14px;
  ${({ active }) =>
    active &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${({ theme }) => theme.colors.main};
    `}
`;

export const Option = styled.Text<OptionProps>`
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  color: ${({ theme, active }) =>
    active ? theme.colors.shape_dark : theme.colors.text_detail};
  font-size: ${RFValue(20)}px;
`;
