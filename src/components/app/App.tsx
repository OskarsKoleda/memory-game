import { useCallback, useEffect, useMemo, useState } from "react";
import { Board } from "../../types.ts";
import { GameBoard } from "../gameBoard/gameBoard.tsx";
import { generateInitialBoard } from "./utils.ts";

function App() {
  const initialBoard = generateInitialBoard(4);
  const [board, setBoard] = useState<Board>(initialBoard);

  const openedCards = useMemo(() => {
    return board.flat().filter((card) => card.isOpened && !card.guessed);
  }, [board]);

  const handleCardClick = useCallback(
    (row: number, col: number) => {
      if (openedCards.length === 2) {
        setBoard((prevBoard) => {
          const updatedBoard = prevBoard.map((row) => [...row]);

          openedCards.forEach((card) => {
            updatedBoard[card.row][card.column].isOpened = false;
          });

          return updatedBoard;
        });

        return;
      }

      setBoard((prevBoard) => {
        const updatedBoard = prevBoard.map((singleRow) => [...singleRow]);

        updatedBoard[row][col].isOpened = true;

        return updatedBoard;
      });
    },
    [setBoard, openedCards],
  );

  useEffect(() => {
    if (openedCards.length !== 2) return;

    if (openedCards[0].symbol === openedCards[1].symbol) {
      setBoard((prevBoard) => {
        const updatedBoard = prevBoard.map((row) => [...row]);

        openedCards.forEach((card) => {
          updatedBoard[card.row][card.column].guessed = true;
          updatedBoard[card.row][card.column].isOpened = true;
        });

        return updatedBoard;
      });
    }
  }, [board, openedCards, setBoard]);

  return (
    <div>
      <h1>Memory Game</h1>
      <GameBoard board={board} handleCardClick={handleCardClick} />
    </div>
  );
}

export default App;
