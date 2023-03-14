import { selectedItemAtom } from "@/state/recoil/atoms/selectedItemAtom";
import { useRecoilValue } from "recoil";
import { TeamMemberDetails } from "./team-member/TeamMemberDetails";
import { TeamsDetails } from "./teams/TeamsDetails";

export const RightSidePanelContent = () => {
  const selectedItem = useRecoilValue(selectedItemAtom);

  switch (selectedItem?.type) {
    case "team-member":
      return <TeamMemberDetails id={selectedItem.id} />;
    default:
      return <TeamsDetails />;
  }
};
