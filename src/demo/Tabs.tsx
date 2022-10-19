import { SyntheticEvent, useContext } from "react";
import MuiTab from "@mui/material/Tab";
import MuiTabs from "@mui/material/Tabs";
import { RootStoreContext } from "../store/StoreProvider";
import { TabType } from "../store/store";

const Tabs = () => {
  const { tabsStore } = useContext(RootStoreContext);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    tabsStore.setSelectedTab(newValue);
  };

  return (
    <MuiTabs
      value={tabsStore.selectedTab}
      onChange={handleChange}
      aria-label="basic tabs example"
    >
      {Object.values(tabsStore.tabs).map((item: TabType, idx: number) => (
        <MuiTab
          key={item.label}
          label={`${++idx} ${item.label}`}
          value={item.value}
          id={`tab-${item.value}`}
          aria-controls={`tabpanel-${item.label}`}
          disableRipple
          disabled={item.disabled}
          sx={{ color: "#DADEE4", fontSize: 14, fontWeight: 500 }}
        />
      ))}
    </MuiTabs>
  );
};

export default Tabs;
