import React from 'react';
import styled from 'styled-components/native';
import { primary } from './Colors';
export const LaunchButton = ({ onPress }: { onPress: () => void; }) => {
  return (
    <LaunchTouchable onPress={onPress}>
      <LaunchText />
    </LaunchTouchable>
  );
};
const LaunchTouchable = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  align-items: center;
  min-height: 60px;
background-color: ${primary};
`;

const LaunchText = styled.Text.attrs(() => ({
  children: "LAUNCH",
}))`
background-color: ${primary};
color: white;
font-weight: bold;
font-size: 25px;
`;
