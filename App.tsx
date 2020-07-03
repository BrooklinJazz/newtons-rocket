import useInterval from "@use-it/interval";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Graph } from "./Graph";
import { Rocket } from "./Rocket";

export default function App() {
  const Force = 1;
  const Mass = 100;
  const Acceleration = Force / Mass;
  const [Time, setTime] = useState(0);
  const Speed = Acceleration * Time;
  const Distance = Speed * Time;

  useInterval(
    () => {
      setTime(Time + 1);
    },
    Distance === 100 ? null : 100
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
          borderBottomColor: "black",
          flexDirection: "row",
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}
      >
        <Graph Time={Time} Distance={Distance} Acceleration={Acceleration} />
        <View
          style={{
            flex: 1,
            backgroundColor: "pink",
            height: "100%",
            width: "100%",
          }}
        >
          <Text>This will be an equation list</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Rocket Distance={Distance}/>
      </View>
    </View>
  );
}
