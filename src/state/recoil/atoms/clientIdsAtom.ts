import { Client } from "@/types/Client";
import { atom } from "recoil";

export const clientIdsAtom = atom<Client["id"][]>({
  key: "clientIdsAtom",
  default: [],
});
