import { useContext } from "react";
import { observer } from "mobx-react";
import Box from "@mui/material/Box";
import { RootStoreContext } from "../store/StoreProvider";
import { TabType } from "../store/store";
import Filter from "./Filter";
import ProductList from "./ProductList";

interface TabPanelProps {
  children?: React.ReactNode;
  id: string;
  value: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, id, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== id}
      id={`tabpanel-${id}`}
      aria-labelledby={`tab-${id}`}
      {...other}
    >
      {value === id && <Box sx={{ py: "24px" }}>{children}</Box>}
    </div>
  );
}

const TabPanels = observer(() => {
  const { tabsStore } = useContext(RootStoreContext);

  return (
    <>
      {Object.values(tabsStore.tabs).map((item: TabType, idx: number) => (
        <TabPanel
          key={item.value}
          value={tabsStore.selectedTab}
          id={item.value}
        >
          <Filter />
          <ProductList />
        </TabPanel>
      ))}
    </>
  );
});

export default TabPanels;
