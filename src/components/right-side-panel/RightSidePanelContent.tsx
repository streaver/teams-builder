import { selectedItemAtom } from "@/state/recoil/atoms/selectedItemAtom";
import { useRecoilValue } from "recoil";
import { TeamsDetails } from "./teams/TeamsDetails";

export const RightSidePanelContent = () => {
  const selectedItem = useRecoilValue(selectedItemAtom);

  switch (selectedItem?.type) {
    case "team-member":
      return <div>TODO: render the team members stuff</div>;
    default:
      return <TeamsDetails />;
  }
};
