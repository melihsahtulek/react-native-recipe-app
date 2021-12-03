import React, { useState } from "react";
import { Image, Pressable } from "react-native";
import styled from "styled-components/native";

const CarouselContainer = styled.View`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
`;

const Item = styled.View`
  width: 100%;
  height: 100%;
  transform: translateX(${(props) => props.move}px);
`;

const CustomImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const Text = styled.Text`
  color: white;
  font-size: 20px;
`;

const Carousel = ({ images }) => {
  const [start, setStart] = useState(0);
  const [move, setMove] = useState(0);
  const [width, setWidth] = useState(0);
  const [count, setCount] = useState(0);
  const [prevOrNext, setPrevOrNext] = useState("");

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setWidth(width);
  };

  const touchStart = (event) => {
    let { pageX } = event.nativeEvent;
    setStart(pageX);
  };

  const touchMove = (event) => {
    let { pageX } = event.nativeEvent;
    if (start > pageX && count < images.length - 1) {
      setPrevOrNext("next");
      setMove((start - pageX) * -1 - count * width);
    }

    if (start < pageX && count > 0) {
      setPrevOrNext("prev");
      setMove((count * width - (pageX - start)) * -1);
    }
  };

  const touchEnd = (event) => {
    if (prevOrNext === "next" && count < images.length - 1) {
      let newCount = count;
      newCount += 1;
      setCount(newCount);
      setMove(width * (count + 1) * -1);
      setPrevOrNext("");
    }

    if (prevOrNext === "prev" && count > 0) {
      let newCount = count;
      newCount -= 1;
      setCount(newCount);
      setMove(width * (count - 1) * -1);
      setPrevOrNext("");
    }
  };

  const touchCancel = (event) => {
    console.log("touchCancel!");
  };

  return (
    <CarouselContainer>
      <Pressable
        onLayout={onLayout}
        style={{ flex: 1, flexDirection: "row" }}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
        onTouchCancel={touchCancel}
      >
        {images.map((image) => (
          <Item move={move} key={image.id}>
            <CustomImage source={image.src} resizeMode="cover" />
          </Item>
        ))}
      </Pressable>
    </CarouselContainer>
  );
};

export default Carousel;
