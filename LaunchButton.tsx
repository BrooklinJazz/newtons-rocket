import React from 'react';
import styled from 'styled-components/native';
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
  height: 60px;
`;
const LaunchText = styled.Text.attrs(() => ({
  children: "LAUNCH",
}))``;
