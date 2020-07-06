import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { PhysicsProvider } from "./PhysicsContext";
import { NewtonsRocket } from "./NewtonsRocket";

export default function App() {
  return (
    <PhysicsProvider>
      <SafeAreaView>
          <StatusBar/>
        <NewtonsRocket />
      </SafeAreaView>
    </PhysicsProvider>
  );
}
