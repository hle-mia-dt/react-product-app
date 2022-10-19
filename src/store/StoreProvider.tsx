import { createContext, ReactElement } from "react";
import RootStore from "./RootStore";

const rootStore = new RootStore();

const RootStoreContext = createContext<RootStore>(rootStore);

interface Props {
  children: null | ReactElement;
}

const StoreProvider = ({ children }: Props) => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export { RootStoreContext };

export default StoreProvider;
