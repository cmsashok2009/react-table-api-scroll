import React from "react";

const ErrorHandler = ({ message, onRetry }) => {
  return (
    <div>
      <h2>Error: {message}</h2>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
};

export default ErrorHandler;
