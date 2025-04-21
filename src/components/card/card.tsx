import styles from "./styles.module.css";
import cardBackSvg from "../../assets/card_back.svg";

type CardProps = {
  symbol: number;
  isOpened: boolean;
  handleClick: () => void;
};

export function Card({ symbol, isOpened, handleClick }: CardProps) {
  return (
    <div className={styles.card} onClick={handleClick}>
      {isOpened ? symbol : <img src={cardBackSvg} alt="card back" />}
    </div>
  );
}
