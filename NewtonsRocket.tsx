import useInterval from "@use-it/interval";
import React, { useEffect, useContext } from "react";
import {
  Alert,
  View,
  TextInput,
  Platform,
  useWindowDimensions,
  KeyboardAvoidingView,
} from "react-native";
import { Graph } from "./Graph";
import { Rocket } from "./Rocket";
import { LaunchButton } from "./LaunchButton";
import { Equations } from "./Equations";
import { MaximumDistance } from "./MaximumDistance";
import { PhysicsContext } from "./PhysicsContext";
import { background } from "./Colors";
import { ControlPanel } from "./ControlPanel";
export const NewtonsRocket = () => {
  const { Distance, stop, start } = useContext(PhysicsContext);

  useEffect(() => {
    if (Distance >= MaximumDistance) {
      Alert.alert("Liftoff!!", undefined, [
        {
          text: "Launch",
          onPress: stop,
        },
      ]);
    }
  }, [Distance]);

  // on Android, the height changes when the keyboard opens
  // so elements are shoved upwards
  // to fix this, use the window dimensions on android
  const { height: androidHeight, width: androidWidth } = useWindowDimensions();
  const height = Platform.select<string | number>({
    android: androidHeight,
    ios: "100%"
  })
  const width = Platform.select<string | number>({
    android: androidWidth,
    ios: "100%"
  })
  return (
    <View
      style={{
        height,
        width,
      }}
    >
      <View
        style={{
          width,
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
      <View style={{ flex: 1, justifyContent: "flex-end", height }}>
        <Rocket />
          <ControlPanel />
      </View>
      <LaunchButton onPress={start} />
    </View>
  );
};
