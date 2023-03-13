import { teamMembersSelectorFamily } from "@/state/recoil/selectors/teamMembersSelectorFamily";
import Fraction from "fraction.js";
import { useRecoilValue } from "recoil";

export const BenchInfo = () => {
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
    <p>
      Bench size: {benchedMembers.length}{" "}
      {benchedMembers.length > 0 ? `(${benchFullTimesText} Full-Time)` : null}
    </p>
  );
};
