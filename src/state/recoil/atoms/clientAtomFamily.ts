import { Client } from "@/types/Client";
import { atomFamily } from "recoil";

export const clientAtomFamily = atomFamily<Client, Client["id"]>({
  key: "clientAtomFamily",
  default: (id) => ({
    id,
    name: "",
    color: "",
  }),
});
