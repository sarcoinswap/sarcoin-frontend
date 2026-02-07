import React from "react";
import { SequencePlayer } from "./SequencePlayer";
import { bnb2SarcoinImages, sarcoin2BnbImages } from "./constant";

export default {
  title: "Components/CoinSwitcher",
  component: SequencePlayer,
  argTypes: {},
};

export const Bnb2Sarcoin: React.FC<React.PropsWithChildren> = () => {
  return (
    <div>
      <SequencePlayer images={bnb2SarcoinImages()} />
    </div>
  );
};

export const Sarcoin2Bnb: React.FC<React.PropsWithChildren> = () => {
  return (
    <div>
      <SequencePlayer images={sarcoin2BnbImages()} />
    </div>
  );
};
