// https://leetcode.com/problems/flood-fill/

export function floodFill(
  image: number[][],
  sr: number,
  sc: number,
  newColor: number
): number[][] {
  const startingPixelColor = image[sr][sc];
  if (startingPixelColor === newColor) return image;
  fillCardinals(image, sr, sc, startingPixelColor, newColor);

  return image;
}

function fillCardinals(
  image: number[][],
  sr: number,
  sc: number,
  startingPixelColor: number,
  newColor: number
) {
  // Set color
  image[sr][sc] = newColor;

  const cardinalPixels = getCardinalPixelColors(image, sr, sc);
  if (cardinalPixels.top === startingPixelColor) {
    fillCardinals(image, sr - 1, sc, startingPixelColor, newColor);
  }
  if (cardinalPixels.right === startingPixelColor) {
    fillCardinals(image, sr, sc + 1, startingPixelColor, newColor);
  }
  if (cardinalPixels.bottom === startingPixelColor) {
    fillCardinals(image, sr + 1, sc, startingPixelColor, newColor);
  }
  if (cardinalPixels.left === startingPixelColor) {
    fillCardinals(image, sr, sc - 1, startingPixelColor, newColor);
  }
}

function getCardinalPixelColors(image: number[][], sr: number, sc: number) {
  const maxWidth = image[0].length - 1;
  const maxHeight = image.length - 1;
  // Top
  const top = sr === 0 ? undefined : image[sr - 1][sc];
  // Right
  const right = sc === maxWidth ? undefined : image[sr][sc + 1];
  // Bottom
  const bottom = sr === maxHeight ? undefined : image[sr + 1][sc];
  // Left
  const left = sc === 0 ? undefined : image[sr][sc - 1];
  return { top, right, bottom, left };
}
