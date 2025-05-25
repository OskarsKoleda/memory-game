import { useCallback, useEffect, useMemo, useState } from "react";
import { Board } from "../../types.ts";
import { GameBoard } from "../gameBoard/gameBoard.tsx";
import { generateInitialBoard } from "./utils.ts";
import { GameOver } from "../gameOver/gameOver.tsx";

function App() {
  const initialBoard = generateInitialBoard(4);
  const [board, setBoard] = useState<Board>(initialBoard);
  const [isGameOver, setIsGameOver] = useState(false);

  const openedCards = useMemo(() => {
    return board.flat().filter((card) => card.isOpened && !card.guessed);
  }, [board]);

  const closeOpenedCards = useCallback(
    (prevBoard: Board) => {
      const updatedBoard = prevBoard.map((row) => [...row]);

      openedCards.forEach((card) => {
        updatedBoard[card.row][card.column].isOpened = false;
      });

      return updatedBoard;
    },
    [openedCards],
  );

  const openCard = useCallback((prevBoard: Board, row: number, col: number) => {
    const updatedBoard = prevBoard.map((singleRow) => [...singleRow]);

    updatedBoard[row][col].isOpened = true;

    return updatedBoard;
  }, []);

  const handleCardClick = useCallback(
    (row: number, col: number) => {
      if (openedCards.length === 2) {
        setBoard(closeOpenedCards);
        return;
      }

      setBoard((prevBoard) => openCard(prevBoard, row, col));
    },
    [openedCards, closeOpenedCards, openCard],
  );

  const startNewGame = useCallback(() => {
    setIsGameOver(false);
    setBoard(generateInitialBoard(4));
  }, []);

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

  useEffect(() => {
    const allCardsGuessed = board.flat().every((card) => card.guessed);

    if (allCardsGuessed) {
      setIsGameOver(true);
    }
  }, [board]);

  return (
    <div>
      <h1>Memory Game</h1>
      <GameBoard board={board} handleCardClick={handleCardClick} />
      <GameOver open={isGameOver} startNewGame={startNewGame} />
    </div>
  );
}

export default App;
