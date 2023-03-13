import { teamMembersByWorkingHoursSelectorFamily } from "@/state/recoil/selectors/teamMembersByWorkingHoursSelectorFamily";
import { teamMembersSelectorFamily } from "@/state/recoil/selectors/teamMembersSelectorFamily";
import Fraction from "fraction.js";
import { useRecoilValue } from "recoil";

export const GeneralTeamsInformation = () => {
  const fullTimeMembers = useRecoilValue(
    teamMembersByWorkingHoursSelectorFamily(8)
  );
  const partTimeMembers = useRecoilValue(
    teamMembersByWorkingHoursSelectorFamily(6)
  );
  const quartTimemembers = useRecoilValue(
    teamMembersByWorkingHoursSelectorFamily(4)
  );

  const numOfFullTimesFromPartials = Math.floor(
    (partTimeMembers.length * 6 + quartTimemembers.length * 4) / 8
  );

  const benchedMembers = useRecoilValue(teamMembersSelectorFamily(null));
  const benchWorkingHours = benchedMembers.reduce((workingHours, teamMeber) => {
    return workingHours + teamMeber.hours;
  }, 0);

  const benchFullTimes = Math.floor(benchWorkingHours / 8);
  const benchFullTimesFromPartials = new Fraction(
    (benchWorkingHours % 8) / 8
  ).toFraction();

  const benchFullTimesText = `${benchFullTimes > 0 ? benchFullTimes : ""} ${
    benchFullTimesFromPartials !== "0" ? ` ${benchFullTimesFromPartials}` : ""
  }`;

  return (
    <div className="flex flex-col items-stretch gap-4 p-4 text-sm divide-y">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold">Engineering team</h1>
        <p>{fullTimeMembers.length} Full-Time</p>
        <p>{partTimeMembers.length} Part-Time</p>
        <p>{quartTimemembers.length} Quart-Time</p>
        <p className="font-medium ">
          means {numOfFullTimesFromPartials} Full-Time
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 pt-4">
        <p>
          Bench size: {benchedMembers.length}{" "}
          {benchedMembers.length > 0
            ? `(${benchFullTimesText} Full-Time)`
            : null}
        </p>
      </div>
    </div>
  );
};
