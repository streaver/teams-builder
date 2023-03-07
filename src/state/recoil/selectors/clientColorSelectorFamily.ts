import { Client } from "@/types/Client";
import { selectorFamily } from "recoil";
import { clientAtomFamily } from "../atoms/clientAtomFamily";

export const clientColorSelectorFamily = selectorFamily<
  string | null,
  Client["id"]
>({
  key: "clientColorSelectorFamily",
  get:
    (teamClientId) =>
    ({ get }) => {
      const client = get(clientAtomFamily(teamClientId));
      return client ? client.color : null;
    },
});
