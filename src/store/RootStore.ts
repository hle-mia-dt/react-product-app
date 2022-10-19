import CategoryListStore from "./CategoryListStore";
import SearchProductStore from "./SearchProductStore";
import TabsStore from "./TabsStore";

class RootStore {
  searchProductStore: SearchProductStore;
  categoryListStore: CategoryListStore;
  tabsStore: TabsStore;

  constructor() {
    this.searchProductStore = new SearchProductStore(this);
    this.categoryListStore = new CategoryListStore();
    this.tabsStore = new TabsStore();
  }
}

export default RootStore;
