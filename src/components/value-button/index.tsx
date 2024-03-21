import styled, { DefaultTheme, css } from "styled-components";

import { ACTION_TYPES } from "../../shared/enums";
import { useAppContext } from "../../context/use-app-context";

type Props = { value: number };
interface ButtonProps {
  readonly $themeNo: string;
}
export const Button = styled.button<ButtonProps & DefaultTheme>`
  ${({ theme, $themeNo }) => css`
    background-color: ${theme[$themeNo].button};

    &:hover {
      background-color: ${theme[$themeNo].secondary_button};
    }
  `};
`;

export default function ValueButton({ value }: Props) {
  const { state, handleDispatch } = useAppContext();

  function handleSaveValue(value: string) {
    handleDispatch({
      type: ACTION_TYPES.SAVE_EXPRESSION,
      payload: { expression: value }
    });
  }

  return (
    <div
      className={`w-full flex items-center justify-center border `}
      onClick={() => handleSaveValue(value.toString())}
    >
      <Button
        $themeNo={`${state.theme}`}
        className={`w-full text-center h-full text-xl`}
      >
        {value}
      </Button>
    </div>
  );
}
