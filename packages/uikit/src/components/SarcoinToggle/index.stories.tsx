import React, { useState } from "react";
import SarcoinToggle from "./SarcoinToggle";

export default {
  title: "Components/SarcoinToggle",
  component: SarcoinToggle,
};

export const Default: React.FC<React.PropsWithChildren> = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggle = () => setIsChecked(!isChecked);

  return (
    <>
      <div style={{ marginBottom: "32px" }}>
        <SarcoinToggle checked={isChecked} onChange={toggle} />
      </div>
      <div style={{ marginBottom: "32px" }}>
        <SarcoinToggle checked={isChecked} onChange={toggle} scale="md" />
      </div>
      <div>
        <SarcoinToggle checked={isChecked} onChange={toggle} scale="sm" />
      </div>
    </>
  );
};
