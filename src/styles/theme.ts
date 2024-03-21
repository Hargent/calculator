import { DefaultTheme } from "styled-components";
import { adjustLightness } from "../util";

const Theme: DefaultTheme = {
  1: {
    base: "rgba(50, 30, 0, 0.8)",
    accent_button: "#ff9f0c",
    secondary_button: adjustLightness("rgba(50, 30, 0, 0.8)", 20),
    // secondary_button: colord("rgba(50, 30, 0, 0.8)").lighten(20),
    button: adjustLightness("rgba(50, 30, 0, 0.8)", 40)
  },
  2: {
    base: "rgba(0, 0, 0, 0.5)",
    accent_button: "#cc0000",
    secondary_button: adjustLightness("rgba(0, 0, 0, 0.5)", 20),
    button: adjustLightness("rgba(0, 0, 0, 0.5)", 40)
  }
};
export default Theme;
