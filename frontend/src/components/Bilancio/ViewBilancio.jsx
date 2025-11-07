import React from "react";
import TestBilancio from "./TestBilancio";
import bilancioData from "./bilancioData.json"; // oppure array inline

export default function App() {
  return <TestBilancio voci={bilancioData} />;
}
