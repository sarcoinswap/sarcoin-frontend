import React from "react";
import { SarcoinPrice, SarcoinPriceProps } from ".";
import { Flex } from "../Box";

export default {
  title: "Components/SarcoinPrice",
  component: SarcoinPrice,
};

const Template: React.FC<React.PropsWithChildren<SarcoinPriceProps>> = ({ ...args }) => {
  return (
    <Flex p="10px">
      <SarcoinPrice {...args} />
    </Flex>
  );
};

export const Default = Template.bind({});
Default.args = {
  sarcoinPriceUsd: 20.0,
};
