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

// 3x3 grid
export const GRID_COLS = 3;
export const GRID_GAP = 64;

// Team box Height
export const DEFAULT_TEAM_BOX_HEIGHT =
  MEMBER_HEIGHT * 2 + MEMBER_BORDER * 2 + TEAM_PADDING * 2 + TEAM_GAP;
