import { Card } from "../card/card.tsx";
import styles from "./styles.module.css";
import { useCallback, useEffect, useState } from "react";

const initialBoard = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [1, 2, 3, 4],
  [5, 6, 7, 8],
];

interface BoardSquare {
  symbol: number;
  isOpened: boolean;
  guessed: boolean;
}

function App() {
  const boardWithData: BoardSquare[][] = initialBoard.map((row) =>
    row.map((symbol) => ({ symbol, isOpened: false, guessed: false })),
  );

  const [board, setBoard] = useState<BoardSquare[][]>(boardWithData);

  const handleCardClick = useCallback(
    (row: number, col: number) => {
      setBoard((prevBoard) => {
        const updatedBoard = prevBoard.map((row) => [...row]);

        updatedBoard[row][col].isOpened = true;

        return updatedBoard;
      });
    },
    [setBoard],
  );

  useEffect(() => {
    const openedCards = board.flat().filter((card) => card.isOpened && !card.guessed);

    if (openedCards.length !== 2) return;

    if (openedCards[0].symbol === openedCards[1].symbol) {
      openedCards.forEach((card) => {
        card.isOpened = true;
        card.guessed = true;
      });
    } else {
      openedCards.forEach((card) => {
        card.isOpened = false;
      });
    }
  }, [board]);

  return (
    <div>
      <h1>This is supposed to be a memory game</h1>
      <div className={styles.container}>
        <div className={styles.grid}>
          {board.map((row, rowIndex) =>
            row.map((card, colIndex) => (
              <Card
                key={colIndex}
                symbol={card.symbol}
                handleClick={() => handleCardClick(rowIndex, colIndex)}
                isOpened={card.isOpened}
              />
            )),
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
