import { useTranslation } from "@sarcoinswap/localization";
import { Box, InfoFilledIcon, LinkExternal, Placement, Text, TooltipText, useTooltip } from "@sarcoinswap/uikit";
import { isMobile } from "react-device-detect";
import styled from "styled-components";

const InlineLink = styled(LinkExternal)`
  display: inline-flex;
  margin-left: 4px;
`;

type MerklNoticeContentProps = {
  linkColor?: string;
  merklUserLink?: string;
  hasFarm?: boolean;
};

export const MerklNoticeContent: React.FC<MerklNoticeContentProps> = ({
  linkColor = "primary",
  hasFarm,
  merklUserLink,
}) => {
  const { t } = useTranslation();

  if (hasFarm) {
    return (
      <>
        <Box>
          <Text display="inline" color="currentColor">
            {t("Incentives can now be earned on BOTH Merkl and Farms at the same time.")}
            <p>
              {t("Stake your LP token in the Farm and accrue both Merkl and Farm rewards.")}
              <br />
              <br />
              {t("Claim your Farm rewards on PancakeSwap and your Merkl rewards on")}
              <InlineLink color={linkColor} external display="inline" href={merklUserLink}>
                {t("Merkl's website")}
              </InlineLink>
            </p>
            <br />
            {/* {merklApr && (
              <InlineLink color={linkColor} external display="inline" href={merklLink}>
                {t("Merkl APR")}: {merklApr?.toFixed(2)}%
              </InlineLink>
            )} */}
            <br />
            <br />
            {t("To earn Farm rewards, continue seeding liquidity on PancakeSwap and stake your LP token in the Farm.")}
          </Text>
        </Box>
      </>
    );
  }
  return (
    <>
      <Box>
        <Text display="inline" color="currentColor">
          <p>{t("Incentives can now be earned on BOTH Merkl and Farms at the same time.")}</p>
          <br />
          {/* {merklApr && (
            <>
              <InlineLink color={linkColor} external display="inline" href={merklLink}>
                {t("Merkl APR")}: {merklApr?.toFixed(2)}%
              </InlineLink>
              <br />
              <br />
            </>
          )} */}
          {t("Stake your LP token in the Farm and accrue both Merkl and Farm rewards.")}
          <br />
          <br />
          {t("Claim your Farm rewards on PancakeSwap and your Merkl rewards on")}
          <InlineLink color={linkColor} external display="inline" href={merklUserLink}>
            {t("Merkl's website")}
          </InlineLink>
        </Text>
      </Box>
    </>
  );
};

type MerklNoticeProps = {
  // warning icon width/height px
  size?: string;
  placement?: Placement;
  tooltipOffset?: [number, number];
  merklUserLink?: string;
  hasFarm?: boolean;
};

const MerklNotice: React.FC<MerklNoticeProps> = ({
  size = "20px",
  placement = "top-start",
  tooltipOffset = [-20, 10],
  hasFarm,
  merklUserLink,
}) => {
  const { tooltip, tooltipVisible, targetRef } = useTooltip(
    <MerklNoticeContent hasFarm={hasFarm} merklUserLink={merklUserLink} />,
    {
      placement,
      tooltipOffset,
      trigger: isMobile ? "focus" : "hover",
    }
  );

  return (
    <>
      <TooltipText ref={targetRef} display="inline">
        <Text lineHeight={0}>
          <InfoFilledIcon color="#6532CD" width={size} height={size} />
        </Text>
      </TooltipText>
      {tooltipVisible ? tooltip : null}
    </>
  );
};

export default {
  WithTooltip: MerklNotice,
  Content: MerklNoticeContent,
};
