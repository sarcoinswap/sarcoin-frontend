import { darkColors, lightColors } from "../../theme/colors";
import { SarcoinToggleTheme } from "./types";

export const light: SarcoinToggleTheme = {
  handleBackground: lightColors.backgroundAlt,
  handleShadow: lightColors.textDisabled,
};

export const dark: SarcoinToggleTheme = {
  handleBackground: darkColors.backgroundAlt,
  handleShadow: darkColors.textDisabled,
};
