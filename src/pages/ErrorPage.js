import React from "react";
import ErrorMessage from "../components/ErrorMessage";

export default function ErrorPage() {
  return (
    <ErrorMessage message={"Page does not exists"} modifier={"fullHeight"} />
  );
}
