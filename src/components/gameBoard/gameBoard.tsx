import styles from "./styles.module.css";
import { Card } from "../card/card.tsx";
import { Board } from "../../types.ts";

type GameBoardProps = {
  board: Board;
  handleCardClick: (row: number, col: number) => void;
};

export const GameBoard = ({ board, handleCardClick }: GameBoardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {board.map((row, rowIndex) =>
          row.map((card, colIndex) => (
            <Card
              key={colIndex}
              symbol={card.symbol}
              handleClick={() => handleCardClick(rowIndex, colIndex)}
              isOpened={card.isOpened}
              isGuessed={card.guessed}
            />
          )),
        )}
      </div>
    </div>
  );
};
