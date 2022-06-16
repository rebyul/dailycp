export const isHoppable = (towers: number[], index = 0): boolean => {
  if (towers === []) return false;

  const currentHeight = towers[index];
  if (currentHeight === 0) return false;

  const steps = getTowerSteps(currentHeight);

  for (const s of steps) {
    const nextIndex = index + s;

    if (nextIndex >= towers.length) {
      return true;
    }

    const nextTowerHeight = towers[nextIndex];
    if (nextTowerHeight <= currentHeight) {
      if (isHoppable(towers, nextIndex)) return true;
    }
  }
  return false;
};

export const isHoppableDp = (towers: number[], index = 0): boolean => {
  if (towers === []) return false;

  const cache = new Array(towers.length + 1).fill(false);
  cache[index] = true;

  for (let i = index; i < towers.length; i++) {
    if (!cache[i]) continue;

    if (i > towers.length) {
      cache[Math.min(i, towers.length)] = true;
      break;
    }

    const height = towers[i];
    const steps = getTowerSteps(height);

    for (const step of steps) {
      if (i + step > towers.length) {
        cache[Math.min(i + step, towers.length)] = true;
        break;
      }

      if (cache[i + step] > height) {
        continue;
      }
      cache[i + step] = true;
    }
    console.log(cache);
  }

  return cache[Math.max(cache.length - 1, towers.length)];
};

function getTowerSteps(height: number) {
  return Array(height)
    .fill(0)
    .map((h, i) => i + 1);
}
