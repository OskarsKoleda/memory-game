import styles from "./styles.module.css";
import * as React from "react";

type GameOverProps = {
  open: boolean;
  startNewGame: () => void;
};

export const GameOver = React.memo(({ open, startNewGame }: GameOverProps) => {
  if (!open) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        Game Over
        <button onClick={startNewGame}>New Game</button>
      </div>
    </div>
  );
});
