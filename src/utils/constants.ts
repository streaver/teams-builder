import { radians } from "./math-utils";

export const CAMERA_ANGLE = radians(30);
export const MIN_Z = 10;

// The gap between team members within a team box
export const TEAM_GAP = 2;

// The width of each team member box
export const MEMBER_WIDTH = 146;

// The height of each full-time member box
export const FULL_TIME_MEMBER_HEIGHT = 146;

// The height of each quart-time member box
export const QUART_TIME_MEMBER_HEIGHT =
  (FULL_TIME_MEMBER_HEIGHT - TEAM_GAP) / 2;

// The height of each part-time member box
export const PART_TIME_MEMBER_HEIGHT =
  (FULL_TIME_MEMBER_HEIGHT + QUART_TIME_MEMBER_HEIGHT) / 2;

// The border-width of each member box
export const MEMBER_BORDER = 2;

// The padding of each team box
export const TEAM_PADDING = TEAM_GAP;

// The border size of each team box
export const TEAM_BORDER = 2;

// The initial gap between team boxes within the canvas
export const DEFAULT_GAP_BETWEEN_TEAM_BOXES = 64;

// The initial height of a team box
export const DEFAULT_TEAM_BOX_HEIGHT =
  2 * (FULL_TIME_MEMBER_HEIGHT + TEAM_PADDING + TEAM_BORDER) + TEAM_GAP;

// The initial width of a team box.
export const DEFAULT_TEAM_BOX_WIDTH =
  2 * (MEMBER_WIDTH + TEAM_PADDING + TEAM_BORDER) + TEAM_GAP;
