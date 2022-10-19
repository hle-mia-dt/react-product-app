import { makeAutoObservable } from "mobx";

export type TabType = {
  value: string;
  label: string;
  disabled: boolean;
  selected?: boolean;
};

type Tabs = Record<string, TabType>;

class TabsStore {
  tabs: Tabs = {};
  selectedTab: string = "";

  constructor() {
    makeAutoObservable(this);
    const tabList = [
      { value: "product", label: "Product", disabled: false },
      { value: "addresses", label: "Addresses", disabled: true },
      { value: "overview", label: "Overview", disabled: true },
    ];
    tabList.forEach((item: TabType) => {
      this.tabs[item.value] = { ...item, selected: false };
    });
    this.selectedTab = tabList[0].value;
  }

  setSelectedTab(value: string) {
    this.selectedTab = value;
    for (const key of Object.keys(this.tabs)) {
      if (key === value) {
        this.tabs[key] = { ...this.tabs[key], selected: true };
      } else {
        this.tabs[key] = { ...this.tabs[key], selected: false };
      }
    }
  }
}

export default TabsStore;
