import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NewtonsRocket } from './NewtonsRocket';
import { PhysicsProvider } from './PhysicsContext';


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
