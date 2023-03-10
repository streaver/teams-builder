export const randomTeamId = () => {
  const min = 100;
  const max = Number.MAX_SAFE_INTEGER;

  return Math.floor(Math.random() * (max - min + 1) + min);
};
