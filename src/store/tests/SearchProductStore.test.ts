import SearchProductStore from "../SearchProductStore";
import RootStore from "../RootStore";
import { when } from "mobx";

describe("SearchProductStore", () => {
  it("creates new products", () => {
    const store = new SearchProductStore(new RootStore());
    expect(store.state).toBe("loading");
    expect(store.products.length).toBe(0);
    expect(store.filterProducts).toHaveLength(0);
    expect(store.searchKeyword).toEqual("");
    expect(store.productDetail).toBeNull();
    when(
      () => store.state === "hasData",
      () => {
        expect(store.products.length).toBe(10);
        expect(store.filterProducts).toHaveLength(10);
        store.setSearchKeyword("Foxit");
        expect(store.searchKeyword).toHaveValue("Foxit");
        expect(store.filterProducts).toHaveLength(2);
        store.filterProducts.forEach((foxit) => {
          expect(foxit?.productName).toEqual(/Foxit/);
        });
        store.setProductDetail(store.filterProducts[0]);
        expect(store.setProductDetail).toHaveBeenCalledWith();
        expect(store.productDetail).not.toBeNull();
        expect(store.productDetail).toEqual(store.filterProducts[0]);
      }
    );
  });
});
