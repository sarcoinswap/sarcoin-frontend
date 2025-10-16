import { useTranslation } from "@sarcoinswap/localization";
import { Text } from "@sarcoinswap/uikit";

export function LiquidityNotConnect() {
  const { t } = useTranslation();

  return (
    <Text color="textSubtle" textAlign="center">
      {t("Connect to a wallet to view your liquidity.")}
    </Text>
  );
}
