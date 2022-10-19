import { observable, makeAutoObservable } from "mobx";

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

export default CategoryListStore;
