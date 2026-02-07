import React from "react";
import { styled } from "styled-components";
import LogoRound from "../Svg/Icons/LogoRound";
import Text from "../Text/Text";
import Skeleton from "../Skeleton/Skeleton";
import { Colors } from "../../theme";

export interface Props {
  color?: keyof Colors;
  sarcoinPriceUsd?: number;
  showSkeleton?: boolean;
  chainId: number;
}

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  &:hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const SarcoinPrice: React.FC<React.PropsWithChildren<Props>> = ({
  sarcoinPriceUsd,
  color = "textSubtle",
  showSkeleton = true,
  chainId,
}) => {
  return sarcoinPriceUsd ? (
    <PriceLink
      href={`https://sarcoinswap.finance/swap?outputCurrency=0xCa127b33F6e606660D8AbA486A4b167fEd4b5612&chainId=${chainId}`}
      target="_blank"
    >
      <LogoRound width="24px" mr="8px" />
      <Text color={color} bold>{`$${sarcoinPriceUsd.toFixed(3)}`}</Text>
    </PriceLink>
  ) : showSkeleton ? (
    <Skeleton width={80} height={24} />
  ) : null;
};

export default React.memo(SarcoinPrice);
