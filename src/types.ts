interface BoardSquare {
  symbol: number;
  isOpened: boolean;
  guessed: boolean;
  row: number;
  column: number;
}

export type Board = BoardSquare[][];
