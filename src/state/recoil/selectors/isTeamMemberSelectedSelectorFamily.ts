import { TeamMember } from "@/types/Team";
import { selectorFamily } from "recoil";
import { isItemSelectedSelectorFamily } from "./isItemSelectedSelectorFamily";

export const isTeamMemberSelectedSelectorFamily = selectorFamily<
  boolean,
  TeamMember["id"]
>({
  key: "isTeamMemberSelectedSelectorFamily",
  get:
    (memberId) =>
    ({ get }) => {
      return get(
        isItemSelectedSelectorFamily({ id: memberId, type: "team-member" })
      );
    },
});
