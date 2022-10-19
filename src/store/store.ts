import { makeAutoObservable, observable, runInAction } from "mobx";
import productsJson from "../products.json";

function mockPromiseFetchProducts() {
  const promise = new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      resolve(productsJson);
    }, 1500);
  });
  return promise;
}

export type TProduct = {
  productId: number;
  productName: string;
  tags: string[];
  category: string;
  manufacturerUrl: string;
  description: string[];
  option1: string;
  option2: string;
};

type State = "idle" | "loading" | "hasData" | "hasError";

// type Category = {
//   id: string;
//   name: string;
//   checked: string;
// };

// class CategoryItem {
//   id: string;
//   name: string;
//   checked: boolean;

//   constructor(id: string, name: string) {
//     makeAutoObservable(this, {
//       id: false,
//       name: false,
//     });
//     this.id = id;
//     this.name = name;
//     this.checked = false;
//   }

//   setChecked() {
//     this.checked = !this.checked;
//   }
// }

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

class CategoryListStore {
  categories = observable.map();

  constructor() {
    makeAutoObservable(this);
    [
      "Software Development",
      "Daily Business",
      "Graphic Editors",
      "Text Editors",
      "Management Tools",
    ].forEach((item) => {
      const id = item.replace(" ", "_");
      this.categories.set(id, { id, name: item, checked: false });
    });
  }

  setChecked(id: string) {
    const currentValue = this.categories.get(id);
    this.categories.set(id, {
      ...currentValue,
      checked: !currentValue.checked,
    });
  }

  get checkedCategories() {
    const filterCategories: string[] = [];
    this.categories.forEach((value, key) => {
      if (value.checked) {
        filterCategories.push(value.name);
      }
    });
    return filterCategories;
  }
}

class SearchProductStore {
  state: State = "idle";
  products: Array<TProduct> = [];
  searchKeyword: string = "";
  productDetail: TProduct | null = null;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
    this.fetchProducts();
  }

  setProductDetail(product: TProduct) {
    this.productDetail = product;
  }

  setSearchKeyword(value: string) {
    this.searchKeyword = value;
  }

  async fetchProducts() {
    this.state = "loading";
    try {
      const json = await mockPromiseFetchProducts();
      runInAction(() => {
        this.products = json;
        this.state = "hasData";
      });
    } catch (e) {
      runInAction(() => {
        this.state = "hasError";
      });
    }
  }

  get filterProducts() {
    let products = this.products;
    const categoryNames = this.rootStore.categoryListStore.checkedCategories;
    if (categoryNames.length) {
      products = products.filter((item) =>
        categoryNames.includes(item.category)
      );
    }

    if (this.searchKeyword.length) {
      products = products.filter((item) =>
        item.productName.includes(this.searchKeyword)
      );
    }

    return products;
  }
}

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
