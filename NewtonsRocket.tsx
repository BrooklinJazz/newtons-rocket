import useInterval from "@use-it/interval";
import React, { useEffect, useContext } from "react";
import {
  Alert,
  View,
  TextInput,
  Platform,
  useWindowDimensions,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { Graph } from "./Graph";
import { Rocket } from "./Rocket";
import { LaunchButton } from "./LaunchButton";
import { Equations } from "./Equations";
import { MaximumDistance } from "./MaximumDistance";
import { PhysicsContext } from "./PhysicsContext";
import { background } from "./Colors";
import { ControlPanel } from "./ControlPanel";
import { useDimensions } from "./useDimensions";

const webStyles =
  Platform.OS === "web"
    ? {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }
    : {};

const Container = ({ height, width, children }) => {
  return (
    <View
      style={{
        height,
        width,
        ...webStyles,
      }}
    >
      {children}
    </View>
  );
};

export const NewtonsRocket = () => {
  const { Distance, stop, start } = useContext(PhysicsContext);

  useEffect(() => {
    if (Distance >= MaximumDistance) {
      const reset = Platform.select({
        web: () => {
          alert("Liftoff!");
          stop();
        },
        default: () =>
          Alert.alert("Liftoff!", undefined, [
            {
              text: "Launch Again",
              onPress: stop,
            },
          ]),
      });
      reset();
    }
  }, [Distance]);

  // on Android, the height changes when the keyboard opens
  // so elements are shoved upwards
  // to fix this, use the window dimensions on android
  const { height: initHeight, width: initWidth } = useDimensions();
  const height = Platform.select<string | number>({
    android: initHeight - (StatusBar.currentHeight || 0),
    web: "100vh",
    default: "100%",
  });
  const width = Platform.select<string | number>({
    android: initWidth,
    default: "100%",
  });
  return (
    <Container height={height} width={width}>
      <WebWrapper>
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
      </WebWrapper>
    </Container>
  );
};

const WebWrapper = ({ children }) => {
  let height = 0,
    width = 0;
  if (Platform.OS === "web") {
    width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
  }

  return Platform.select({
    web: (
      <View
        style={{
          height: Math.min(height, 700),
          width: Math.min(width, 400),
          borderColor: background,
          borderWidth: 2,
        }}
      >
        {children}
      </View>
    ),
    default: children,
  });
};
