import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Carousel from "../components/Carousel";
import MainLayout from "../components/MainLayout";
import CustomText from "../components/CustomText";
import ListItem from "../components/ListItem";
import { FontAwesome } from "@expo/vector-icons";
import { ActivityIndicator, FlatList } from "react-native";

const HomeScreenContainer = styled.View`
  flex: 1;
  padding-bottom: 15px;
`;

const CategoriesContainer = styled.View`
  flex: 1;
  padding-top: 15px;
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

const images = [
  {
    id: 1,
    src: require("../../assets/app_home_bg_2.jpg"),
  },
  {
    id: 2,
    src: require("../../assets/app_home_bg_1.jpg"),
  },
];

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const makeCall = async () => {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
      const json = await response.json();
      setCat(json["categories"]);
    };

    makeCall();
  }, []);

  const [cat, setCat] = useState(null);

  const goToDetail = (strCategory) => {
    navigation.navigate("CategoryFilterScreen", {
      catName: strCategory,
    });
  };

  return (
    <MainLayout>
      <HomeScreenContainer>
        <Carousel images={images} />
        <CategoriesContainer>
          <CategoriesHeader>
            <FontAwesome name="list" size={20} color="#ffffff" />
            <CustomText txt="categories" fontWeight={400} fontSize={20} color="#ffffff" transform="capitalize" />
          </CategoriesHeader>
          {cat !== null ? (
            <FlatList data={cat} renderItem={({ item }) => <ListItem item={item} func={goToDetail} />} keyExtractor={(item) => item.idCategory} />
          ) : (
            <ActivityIndicator size={52 || "large"} color="#E6E3E2" />
          )}
        </CategoriesContainer>
      </HomeScreenContainer>
    </MainLayout>
  );
};

export default HomeScreen;
