import { radians } from "./math-utils";

export const CAMERA_ANGLE = radians(30);
export const MIN_Z = 10;

// Team member constants
export const MEMBER_WIDTH = 145;
export const MEMBER_HEIGHT = 145;
export const MEMBER_BORDER = 2;

// The padding of each team box
export const TEAM_PADDING = 8;

// The gap between team members within a team box
export const TEAM_GAP = 8;

// The initial gap between team boxes within the canvas
export const DEFAULT_GAP_BETWEEN_TEAM_BOXES = 64;

// The initial height of a team box
export const DEFAULT_TEAM_BOX_HEIGHT =
  MEMBER_HEIGHT * 2 + MEMBER_BORDER * 2 + TEAM_PADDING * 2 + TEAM_GAP;

// The initial width of a team box.
export const DEFAULT_TEAM_BOX_WIDTH =
  2 * MEMBER_WIDTH + 2 * TEAM_PADDING + 2 * MEMBER_BORDER + TEAM_GAP;
