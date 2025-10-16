import { useTranslation } from "@sarcoinswap/localization";
import { Text } from "@sarcoinswap/uikit";

export function NoLiquidity() {
  const { t } = useTranslation();

  return (
    <Text color="textSubtle" textAlign="center">
      {t("No liquidity found.")}
    </Text>
  );
}
