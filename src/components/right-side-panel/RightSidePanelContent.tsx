import { selectedItemAtom } from "@/state/recoil/atoms/selectedItemAtom";
import { useRecoilValue } from "recoil";
import { GeneralTeamsInformation } from "./GeneralTeamsInformation";

export const RightSidePanelContent = () => {
  const selectedItem = useRecoilValue(selectedItemAtom);

  switch (selectedItem?.type) {
    case "team-member":
      return <div>TODO: render the team members stuff</div>;
    default:
      return <GeneralTeamsInformation />;
  }
};
