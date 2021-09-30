import React, { useState, useEffect } from "react";
import { Container } from "./styles";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import { Load } from "../../components/Load";
import { View, Text } from "react-native";

export const MyCars = () => {
  const [cars, setCars] = useState<CarDTO>({} as CarDTO);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/schedules_byuser?user_id=1");
        console.log(response.data);
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      {loading ? (
        <Load />
      ) : (
        <View>
          <Text>oi</Text>
        </View>
      )}
    </Container>
  );
};
