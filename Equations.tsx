import React, { useContext } from "react";
import { Text, View } from "react-native";
import { IPhysics } from "./IPhysics";
import { PhysicsContext } from "./PhysicsContext";
import styled from "styled-components/native";
import { foreground } from "./Colors";

export const BaseText = styled.Text`
  color: ${foreground};
`

const AEqualsBTimesC = ({
  A,
  B,
  C,
  bold = false
}: {
  A: number | string;
  B: number | string;
  C: number | string;
  bold?: boolean;
}) => {
  const [Aformatted, Bformatted, Cformatted] = [A, B, C].map((each) =>
    typeof each === "string" ? each : each.toFixed(2)
  );
  return (
    <BaseText style={{fontWeight: bold ? "bold" : "normal"}}>
      {Aformatted} = {Bformatted} * {Cformatted}
    </BaseText>
  );
};

export const Equations = () => {
  const { Force, Mass, Acceleration, Velocity, Time, Distance } = useContext(
    PhysicsContext
  );
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
      }}
    >
      <View>
        <AEqualsBTimesC bold A="F" B="M" C="A" />
        <AEqualsBTimesC A={Force} B={Mass} C={Acceleration} />
      </View>
      <View>
        <AEqualsBTimesC bold A="V" B="T" C="A" />
        <AEqualsBTimesC A={Velocity} B={Time} C={Acceleration} />
      </View>
      <View>
        <AEqualsBTimesC bold A={"D"} B={"T"} C={"V"} />
        <AEqualsBTimesC A={Distance} B={Time} C={Velocity} />
      </View>
    </View>
  );
};
