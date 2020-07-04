import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { IPhysics } from './App';

const RocketIcon = styled.View`
  background-color: red;
  height: 20px;
  width: 10px;
`;

export const Rocket = ({ Distance }: Pick<IPhysics, "Distance">) => {
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
