import useInterval from "@use-it/interval";
import React, { useEffect, useContext } from "react";
import { Alert, View, TextInput, Platform } from "react-native";
import { Graph } from "./Graph";
import { Rocket } from "./Rocket";
import { LaunchButton } from "./LaunchButton";
import { Equations } from "./Equations";
import { MaximumDistance } from "./MaximumDistance";
import { PhysicsContext } from "./PhysicsContext";
import { background } from "./Colors";
import { ControlPanel } from "./ControlPanel";
export const NewtonsRocket = () => {
  const { Distance, stop, start } = useContext(
    PhysicsContext
  );

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
          padding: 10,
          backgroundColor: background,
        }}
      >
        <Graph />
        <Equations />
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end", height: "100%" }}>
        <Rocket />
        <ControlPanel />
      </View>
      <LaunchButton onPress={start} />
    </View>
  );
};
