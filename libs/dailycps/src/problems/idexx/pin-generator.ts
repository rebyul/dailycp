/**
 * IDEXX interview 24/09/2025
 * generate random pin numbers. length 4
 * returned in a bath that will be useful to developers to use?
 * inside the batch, the pin numbers need to be unique
 * average size ~= 1000
 */

const maxSize = Number.MAX_SAFE_INTEGER;

export function generatePins(batchSize: number) {
  if (batchSize < 0) {
    throw Error('negative batch size');
  }

  if (batchSize > maxSize) {
    throw Error('max size exceeded');
  }

  const resultSet = new Set<string>();

  while (resultSet.size !== batchSize) {
    resultSet.add(generatePin());
  }

  return resultSet;
}

function generatePin(): string {
  // Max pin value = 9999
  const randomPinNumber = Math.random() * 9999;
  return randomPinNumber.toString().padStart(4, '0');
}
