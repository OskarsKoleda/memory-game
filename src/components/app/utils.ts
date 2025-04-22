import { Board } from "../../types.ts";

export const generateInitialBoard = (dimension: number) => {
  const symbols = Array.from({ length: (dimension * dimension) / 2 }, (_, i) => i);
  const pairs = [...symbols, ...symbols];

  const shuffledPairs = pairs.sort(() => Math.random() - 0.5);

  const board: Board = Array.from({ length: dimension }, (_, row) =>
    Array.from({ length: dimension }, (_, column) => ({
      symbol: shuffledPairs[row * dimension + column],
      isOpened: false,
      guessed: false,
      row,
      column,
    })),
  );

  return board;
};
