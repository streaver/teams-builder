import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useState } from "react";
import { GeneralTeamsInformation } from "./GeneralTeamsInformation";

export const RightSidePanel = () => {
  const [isExpanded, setisExpanded] = useState(false);

  const toggleSidebar = () => {
    setisExpanded((state) => !state);
  };

  return (
    <div
      className={classNames("relative shrink-0 h-full transition-[width]", {
        "w-16": !isExpanded,
        "w-1/5 ml-4": isExpanded,
      })}
    >
      {isExpanded ? <GeneralTeamsInformation /> : null}
      <button
        onClick={toggleSidebar}
        className={classNames("absolute -translate-y-1/2 top-1/2", {
          "left-1/2 -translate-x-1/2": !isExpanded,
          "left-4": isExpanded,
        })}
      >
        {isExpanded ? (
          <ChevronRightIcon className="w-6 h-6" />
        ) : (
          <ChevronLeftIcon className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};
