import React from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import { IPhysics } from "./IPhysics";
import Svg, {SvgUri} from 'react-native-svg';

const RocketIcon = styled.View`
  background-color: red;
  height: 20px;
  width: 10px;
`;

// @ts-ignore
import  RocketNoFlames from "./assets/RocketNoFlames.png"
import  RocketWithFlames from "./assets/RocketWithFlames.png"

export const Rocket = ({ Distance, started }: Pick<IPhysics, "Distance" | "started">) => {
  return (
    <View
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <View style={{height: 100, position: "absolute", bottom: `${Distance}%`}}>
      <Image style={{flex: 1}} resizeMode={"contain"} source={started ? RocketWithFlames : RocketNoFlames}/>
      </View>
    </View>
  );
};
