import { makeAutoObservable, runInAction } from "mobx";
import RootStore from "./RootStore";
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
  option1: null | string;
  option2: null | string;
};

type State = "idle" | "loading" | "hasData" | "hasError";

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

export default SearchProductStore;
