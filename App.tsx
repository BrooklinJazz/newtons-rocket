import useInterval from "@use-it/interval";
import React, { useEffect, useState } from "react";
import { Alert, View, SafeAreaView } from "react-native";
import { Graph } from "./Graph";
import { Rocket } from "./Rocket";
import { LaunchButton } from "./LaunchButton";
import { Equations } from "./Equations";
import { MaximumDistance } from "./MaximumDistance";

export default function App() {
  const Force = 10;
  const Mass = 100;
  const Acceleration = Force / Mass;
  const [Time, setTime] = useState(0);
  const Velocity = Acceleration * Time;
  const Distance = Velocity * Time;
  const [started, setStarted] = useState(false);
  const start = () => setStarted(true);
  useEffect(() => {
    if (Distance >= MaximumDistance) {
      Alert.alert("Huston we have liftoff!!!", undefined, [
        {
          text: "Roger! Lets do it again",
          onPress: () => {
            setStarted(false);
            setTime(0);
          },
        },
      ]);
    }
  }, [Distance]);
  useInterval(
    () => {
      setTime(Time + 0.1);
    },
    Distance >= MaximumDistance || !started ? null : 10
  );
  return (
    <SafeAreaView>
      <View
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            borderBottomColor: "black",
            flexDirection: "row",
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}
        >
          <Graph Time={Time} Distance={Distance} Acceleration={Acceleration} />
          <Equations Distance={Distance} Time={Time} Velocity={Velocity} Mass={Mass} Force={Force} Acceleration={Acceleration} />
        </View>
        <View style={{ flex: 1 }}>
          <Rocket Distance={Distance} started={started} />
        </View>
        <LaunchButton onPress={start} />
      </View>
    </SafeAreaView>
  );
}
