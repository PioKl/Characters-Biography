import React from "react";
import "../styles/ErrorMessage.scss";

export default function ErrorMessage({ message, modifier = "normal" }) {
  return (
    <div className={`errorContainer --${modifier}`}>
      <span>{message}</span>
    </div>
  );
}
