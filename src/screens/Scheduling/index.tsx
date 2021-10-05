import React, { useState, useEffect } from "react";
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
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/core";
import { eachDayOfInterval, format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import { LoadAnimation } from "../../components/LoadAnimation";
import { RootStackAppParamList } from "../../routes/app.stack.routes";

type ScreenProp = StackNavigationProp<RootStackAppParamList, "Scheduling">;

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
  const [scheduledDates, setScheduledDates] = useState<MarkedDatesProps>(
    {} as MarkedDatesProps
  );
  const [selectedDates, setSelectedDates] = useState<SelectedDates>(
    {} as SelectedDates
  );
  const [countScheduled, setCountScheduled] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<ScreenProp>();
  const theme = useTheme();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental() {
    navigation.navigate<any>("SchedulingDetails", {
      car,
      dates: Object.keys(markedDates),
      countScheduled,
    });
  }

  function handleChangeDate(date: DayProps) {
    setCountScheduled(0);
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;
    setCountScheduled(0);

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

    Object.keys(interval).forEach((item) => {
      Object.keys(scheduledDates).forEach((markedItem) => {
        if (markedItem === item) setCountScheduled((c) => c + 1);
      });
    });
  }

  useEffect(() => {
    async function getSchedules() {
      let intervalScheduled: MarkedDatesProps = {};
      await api
        .get(`/schedules_bycars/${car.id}`)
        .then((res) => {
          eachDayOfInterval({
            start: new Date(res.data.unavailable_dates[0]),
            end: new Date(
              res.data.unavailable_dates[res.data.unavailable_dates.length - 1]
            ),
          }).map((item) => {
            const date = format(getPlatformDate(item), "yyyy-MM-dd");
            intervalScheduled = {
              ...intervalScheduled,
              [date]: {
                disabled: true,
                disabledText: true,
                color: theme.colors.text_detail,
                textColor: theme.colors.main_light,
                disableTouchEvent: true,
              },
            };
          });
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
      setScheduledDates(intervalScheduled);
    }
    getSchedules();
  }, []);

  return (
    <Container>
      <Header>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <BackButton color={theme.colors.background_secondary} />
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

      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
          <Calendar
            markedDates={markedDates}
            scheduledDates={scheduledDates}
            onDayPress={handleChangeDate}
          />
        </Content>
      )}
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
