import { teamMembersSelectorFamily } from "@/state/recoil/selectors/teamMembersSelectorFamily";
import { WorkingHours } from "@/utils/team-members-utils";
import Fraction from "fraction.js";
import { useRecoilValue } from "recoil";

export const BenchInfo = () => {
  const members = useRecoilValue(teamMembersSelectorFamily(null));
  const hours = members.reduce((workingHours, teamMeber) => {
    return workingHours + teamMeber.hours;
  }, 0);

  const fullTimes = Math.floor(hours / WorkingHours.FULL_TIME);
  const fullTimeFraction = new Fraction(
    (hours % WorkingHours.FULL_TIME) / WorkingHours.FULL_TIME
  ).toFraction();

  const text = `${fullTimes > 0 ? fullTimes : ""} ${
    fullTimeFraction !== "0" ? ` ${fullTimeFraction}` : ""
  }`;

  return (
    <p>
      Bench size: {members.length}{" "}
      {members.length > 0 ? `(${text} Full-Time)` : null}
    </p>
  );
};
