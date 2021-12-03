import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import MainLayout from "../components/MainLayout";
import CustomText from "../components/CustomText";
import ListItem from "../components/ListItem";
import { FontAwesome } from "@expo/vector-icons";
import { ActivityIndicator, FlatList } from "react-native";

const CatScreenContainer = styled.View`
  flex: 1;
  padding-bottom: 15px;
`;

const CategoriesContainer = styled.View`
  flex: 1;
`;

const CategoriesHeader = styled.View`
  width: 100%;
  height: auto;
  background-color: #3c40c6;
  padding: 12px;
  border-radius: 7px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const CategoryFilterScreen = ({ route, navigation }) => {
  useEffect(() => {
    const makeCall = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${route.params.catName}`);
      const json = await response.json();
      setMeals(json["meals"]);
    };

    makeCall();
  }, []);

  const [meals, setMeals] = useState(null);

  const goToDetail = (id) => {
    navigation.navigate("MealDetailScreen", {
      mealId: id,
    });
  };

  return (
    <MainLayout>
      <CatScreenContainer>
        <CategoriesContainer>
          <CategoriesHeader>
            <FontAwesome name="list-alt" size={20} color="#ffffff" />
            <CustomText txt={route.params.catName} fontWeight={400} fontSize={20} color="#ffffff" transform="capitalize" />
          </CategoriesHeader>
          {meals !== null ? (
            <FlatList data={meals} renderItem={({ item }) => <ListItem item={item} func={goToDetail} />} keyExtractor={(item) => item.idMeal} />
          ) : (
            <ActivityIndicator size={52 || "large"} color="#E6E3E2" />
          )}
        </CategoriesContainer>
      </CatScreenContainer>
    </MainLayout>
  );
};

export default CategoryFilterScreen;
