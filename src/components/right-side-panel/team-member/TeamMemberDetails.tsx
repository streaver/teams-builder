import { TeamMemberAvatar } from "@/components/team-member/avatar/TeamMemberAvatar";
import { teamMemberAtomFamily } from "@/state/recoil/atoms/teamMemberAtomFamily";
import { TeamMember } from "@/types/Team";
import { WorkingHours } from "@/utils/team-members-utils";
import classNames from "classnames";
import { useFormik } from "formik";
import { useRecoilState } from "recoil";

export type Props = {
  id: TeamMember["id"];
};

type FormValues = {
  hours: string;
};

const VALID_WORKING_HOURS_PATTERN = new RegExp(
  `^[${WorkingHours.FULL_TIME},${WorkingHours.PART_TIME},${WorkingHours.QUART_TIME}]$`
);

export const TeamMemberDetails = ({ id }: Props) => {
  const [teamMember, setTeamMember] = useRecoilState(teamMemberAtomFamily(id));

  const form = useFormik<FormValues>({
    initialValues: {
      hours: teamMember.hours.toString(),
    },
    enableReinitialize: true,
    onSubmit: ({ hours }, { setErrors }) => {
      const isBlank = hours.trim() === "";
      const isValid = VALID_WORKING_HOURS_PATTERN.test(hours);

      if (isBlank || !isValid) {
        return setErrors({
          hours: `Working hours must be either ${WorkingHours.FULL_TIME}, ${WorkingHours.PART_TIME} or ${WorkingHours.QUART_TIME}`,
        });
      }

      setTeamMember((member) => ({
        ...member,
        hours: parseInt(hours),
      }));
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit}
      className="flex flex-col justify-between h-full"
    >
      <div className="flex flex-col items-stretch flex-grow gap-4 divide-y">
        <div className="flex items-center gap-8">
          <TeamMemberAvatar id={id} />
          <h1 className="font-bold">
            {teamMember.firstName} {teamMember.lastName}
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between w-full pt-4">
            <span>Working Hours</span>
            <input
              className={classNames(
                "w-12 h-12 text-center bg-white rounded-full shadow-md outine-none focus:outline-none",
                {
                  "ring-2 ring-red-400 text-red-400": !!form.errors.hours,
                }
              )}
              value={form.values.hours}
              id="hours"
              name="hours"
              type="text"
              onChange={form.handleChange}
            />
          </div>
          {form.errors.hours ? (
            <span className="text-center text-red-400">
              {form.errors.hours}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 pt-4">
        <button
          onClick={form.handleReset}
          className="py-2.5 px-6 rounded-lg text-sm font-medium text-dam-red-800 bg-dam-red-200 hover:bg-dam-red-300 focus:outline-red-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="py-2.5 px-6 rounded-lg text-sm font-medium text-dam-green-800 bg-dam-green-200 hover:bg-dam-green-300 focus:outline-green-800"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};
