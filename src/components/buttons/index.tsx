import { colord } from "colord";
import styled, { css, DefaultTheme } from "styled-components";

interface ButtonProps {
  readonly $themeNo: string;
}
const PrimaryButtons = styled.button<ButtonProps & DefaultTheme>`
  ${({ theme, $themeNo }) => css`
    background-color: ${theme[$themeNo].button};
    height: 100%;
    font-size: 2rem;

    color: ${({ theme }) =>
      colord(theme[$themeNo].button).isDark() ? "white" : "black"};

    &:hover {
      background-color: ${({ theme }) =>
        `rgba(${Object.values(
          colord(theme[$themeNo].button).lighten(0.1).rgba
        )})`};
    }
  `};
`;
const SecondaryButtons = styled.button<ButtonProps & DefaultTheme>`
  ${({ theme, $themeNo }) => css`
    background-color: ${theme[$themeNo].secondary_button};
    height: 100%;
    font-size: 2rem;

    color: ${({ theme }) =>
      colord(theme[$themeNo].secondary_button).isDark() ? "white" : "black"};
    &:hover {
      background-color: ${({ theme }) =>
        `rgba(${Object.values(
          colord(theme[$themeNo].secondary_button).lighten(0.1).rgba
        )})`};
    }
  `};
`;

const AccentButtons = styled.div<ButtonProps & DefaultTheme>`
  ${({ theme, $themeNo }) => css`
    background-color: ${theme[$themeNo].accent_button};
    height: 100%;
    font-size: 2rem;

    color: ${({ theme }) =>
      colord(theme[$themeNo].accent_button).isDark() ? "white" : "black"};

    &:hover {
      background-color: ${({ theme }) =>
        `rgba(${Object.values(
          colord(theme[$themeNo].accent_button).lighten(0.1).rgba
        )})`};
    }
  `};
`;
export const CalculatorButtons = {
  primary: PrimaryButtons,
  secondary: SecondaryButtons,
  accent: AccentButtons
};
