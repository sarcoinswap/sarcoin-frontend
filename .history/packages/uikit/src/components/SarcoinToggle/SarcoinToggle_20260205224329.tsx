import React from "react";
import { SarcoinStack, SarcoinInput, SarcoinLabel } from "./StyledSarcoinToggle";
import { SarcoinToggleProps, scales } from "./types";

const SarcoinToggle: React.FC<React.PropsWithChildren<SarcoinToggleProps>> = ({
  checked,
  scale = scales.LG,
  ...props
}) => (
  <SarcoinStack scale={scale}>
    <SarcoinInput id={props.id || "sarcoin-toggle"} scale={scale} type="checkbox" checked={checked} {...props} />
    <SarcoinLabel scale={scale} checked={checked} htmlFor={props.id || "sarcoin-toggle"}>
      <div className="sarcoins">
        <div className="sarcoin" />
        <div className="sarcoin" />
        <div className="sarcoin" />
        <div className="butter" />
      </div>
    </SarcoinLabel>
  </SarcoinStack>
);

export default SarcoinToggle;
