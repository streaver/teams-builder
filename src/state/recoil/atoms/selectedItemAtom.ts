import { atom } from "recoil";

type SelectedItem = {
  id: number;
  type: "team" | "team-member";
};

export const selectedItemAtom = atom<SelectedItem | null>({
  key: "selectedItemAtom",
  default: null,
});
