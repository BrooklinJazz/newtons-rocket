import useInterval from "@use-it/interval";
import React, { useEffect, useContext } from "react";
import { Alert, View } from "react-native";
import { Graph } from "./Graph";
import { Rocket } from "./Rocket";
import { LaunchButton } from "./LaunchButton";
import { Equations } from "./Equations";
import { MaximumDistance } from "./MaximumDistance";
import { PhysicsContext } from "./PhysicsContext";
import { background } from "./Colors";

export const NewtonsRocket = () => {
  const { Distance, stop, incrementTime, started, start } = useContext(PhysicsContext);

  useEffect(() => {
    if (Distance >= MaximumDistance) {
      Alert.alert("Huston we have liftoff!!!", undefined, [
        {
          text: "Roger! Lets do it again",
          onPress: stop,
        },
      ]);
    }
  }, [Distance]);
  useInterval(
    () => {
      incrementTime();
    },
    Distance >= MaximumDistance || !started ? null : 10
  );

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <View
        style={{
          width: "100%",
          borderBottomColor: background,
          flexDirection: "row",
          borderBottomWidth: 1,
          paddingBottom: 10,
          backgroundColor: background,
        }}
      >
        <Graph/>
        <Equations />
      </View>
      <View style={{ flex: 1 }}>
        <Rocket />
      </View>
      <LaunchButton onPress={start} />
    </View>
  );
};
