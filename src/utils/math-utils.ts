export const radians = (angle: number) => {
  return angle * (Math.PI / 180);
};

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const inBounds = (rect1: Rect, rect2: Rect) => {
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  )
    return true;
  else return false;
};
