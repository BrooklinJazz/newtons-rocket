import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import styled from 'styled-components/native';

const RocketIcon = styled.View`
  background-color: red;
  height: 20px;
  width: 10px;
`;

export const Rocket = ({ Distance }: {Distance: number, maxY: number}) => {

  return (
    <View
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <RocketIcon style={{ position: "absolute", bottom: `${Distance}%` }} />
    </View>
  );
};
