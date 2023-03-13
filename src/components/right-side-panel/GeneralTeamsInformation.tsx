import { fullTimeMembersSelector } from "@/state/recoil/selectors/fullTimeMembersSelector";
import { useRecoilValue } from "recoil";

export const GeneralTeamsInformation = () => {
  const fullTimeMembers = useRecoilValue(fullTimeMembersSelector);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="p-4 text-sm font-bold">Engineering team</h1>
      <p>{fullTimeMembers.length} Full-Time</p>
    </div>
  );
};
