import React, { useState } from "react";
import { Alert, StatusBar } from "react-native";
import { useTheme } from "styled-components";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDatesProps,
} from "../../components/Calendar";

import ArrowSvg from "../../assets/arrow.svg";
import {
  Container,
  Header,
  Title,
  RentalInfo,
  DateInfo,
  DateTitle,
  ValueInfo,
  DateValue,
  Content,
  Footer,
} from "./styles";
import { RootStackParamList } from "../../routes/stack.routes";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/core";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { CarDTO } from "../../dtos/CarDTO";

type ScreenProp = StackNavigationProp<RootStackParamList, "Scheduling">;

interface SelectedDates {
  startDateFormatted: string;
  endDateFormatted: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDatesProps>(
    {} as MarkedDatesProps
  );
  const [selectedDates, setSelectedDates] = useState<SelectedDates>(
    {} as SelectedDates
  );

  const navigation = useNavigation<ScreenProp>();
  const theme = useTheme();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental() {
    if (!selectedDates.startDateFormatted && !selectedDates.endDateFormatted) {
      Alert.alert("Preencha um intervalo de dias para prosseguir!");
    } else {
      navigation.navigate<any>("SchedulingDetails", {
        car,
        dates: Object.keys(markedDates),
      });
    }
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }
    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const finalDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setSelectedDates({
      startDateFormatted: format(
        getPlatformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      endDateFormatted: format(
        getPlatformDate(new Date(finalDate)),
        "dd/MM/yyyy"
      ),
    });
  }

  return (
    <Container>
      <Header>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <BackButton
          onPress={() => {}}
          color={theme.colors.background_secondary}
        />
        <Title>
          Escolha uma {"\n"}data de início e {"\n"}fim do aluguel
        </Title>
        <RentalInfo>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <ValueInfo selected={!!selectedDates.startDateFormatted}>
              <DateValue>{selectedDates.startDateFormatted}</DateValue>
            </ValueInfo>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <ValueInfo selected={!!selectedDates.endDateFormatted}>
              <DateValue>{selectedDates.endDateFormatted}</DateValue>
            </ValueInfo>
          </DateInfo>
        </RentalInfo>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>
      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
          enabled={!!selectedDates.endDateFormatted}
        />
      </Footer>
    </Container>
  );
}
