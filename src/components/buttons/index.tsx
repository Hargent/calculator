import styled, { css, DefaultTheme } from "styled-components";

interface ButtonProps {
  readonly $themeNo: string;
}
const PrimaryButtons = styled.button<ButtonProps & DefaultTheme>`
  ${({ theme, $themeNo }) => css`
    background-color: ${theme[$themeNo].button};
    height:100%

    &:hover {
      background-color: ${theme[$themeNo].button};
    }
  `};
`;
const SecondaryButtons = styled.button<ButtonProps & DefaultTheme>`
  ${({ theme, $themeNo }) => css`
    background-color: ${theme[$themeNo].secondary_button};
    height:100%

    &:hover {
      background-color: ${theme[$themeNo].secondary_button};
    }
  `};
`;

const AccentButtons = styled.div<ButtonProps & DefaultTheme>`
  ${({ theme, $themeNo }) => css`
    background-color: ${theme[$themeNo].accent_button};
    height:100%

    &:hover {
      background-color: ${theme[$themeNo].accent_button};
    }
  `};
`;
export const CalculatorButtons = {
  primary: PrimaryButtons,
  secondary: SecondaryButtons,
  accent: AccentButtons
};
