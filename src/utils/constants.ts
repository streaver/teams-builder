import { radians } from "./math-utils";

export const CAMERA_ANGLE = radians(30);
export const MIN_Z = 10;

// Team member constants
export const MEMBER_WIDTH = 145;
export const MEMBER_HEIGHT = 145;
export const MEMBER_BORDER = 2;

// Team boxes constants
export const TEAM_PADDING = 8;
export const TEAM_GAP = 8;

export const DEFAULT_GAP_BETWEEN_TEAM_BOXES = 64;
export const DEFAULT_TEAM_BOX_HEIGHT =
  MEMBER_HEIGHT * 2 + MEMBER_BORDER * 2 + TEAM_PADDING * 2 + TEAM_GAP;
export const DEFAULT_TEAM_BOX_WIDTH =
  2 * MEMBER_WIDTH + 2 * TEAM_PADDING + 2 * MEMBER_BORDER + TEAM_GAP;
