import { selectorFamily } from "recoil";
import { SelectedItem, selectedItemAtom } from "../atoms/selectedItemAtom";

export const isItemSelectedSelectorFamily = selectorFamily<
  boolean,
  SelectedItem
>({
  key: "isItemSelectedSelectorFamily",
  get:
    (item) =>
    ({ get }) => {
      const selectedItem = get(selectedItemAtom);

      return (
        selectedItem !== null &&
        selectedItem.id === item.id &&
        selectedItem.type === item.type
      );
    },
});
