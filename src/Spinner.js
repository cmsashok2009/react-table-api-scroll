import React from "react";
import { SpinnerContainer, SpinnerCircle } from "./App.styles";

const Spinner = () => {
  return (
    <SpinnerContainer data-testid="spinner-container">
      <SpinnerCircle />
    </SpinnerContainer>
  );
};

export default Spinner;
