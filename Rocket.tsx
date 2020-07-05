import React, { useContext } from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import { IPhysics } from "./IPhysics";
import Svg, {SvgUri} from 'react-native-svg';
import  RocketNoFlames from "./assets/RocketNoFlames.png"
import  RocketWithFlames from "./assets/RocketWithFlames.png"
import { PhysicsContext } from './PhysicsContext';
import useInterval from '@use-it/interval';
import { MaximumDistance } from './MaximumDistance';

export const Rocket = () => {
  const {Distance, started, incrementTime} = useContext(PhysicsContext)
  useInterval(
    () => {
      incrementTime();
    },
    Distance >= MaximumDistance || !started ? null : 10
  );
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
