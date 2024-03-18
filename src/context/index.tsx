import { ActionType, AppContextType } from "../shared/types";
import { ReactNode, createContext, useReducer } from "react";
import reducer, { initialState } from "../reducer/reducer";

export const AppContext = createContext<AppContextType | null>(null);

const AppContextProviders = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState as never);

  function handleDispatch(arg: ActionType) {
    dispatch(arg);
  }

  const appContext: AppContextType = {
    state,
    handleDispatch
  };
  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};

export { AppContextProviders };
