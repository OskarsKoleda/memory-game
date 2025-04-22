import styles from "./styles.module.css";
import cardBackSvg from "../../assets/card_back.svg";
import blackLuna from "../../assets/black-luna.svg";
import redLuna from "../../assets/red-luna.svg";
import penta from "../../assets/red-pentagr.svg";
import hammerKeyboard from "../../assets/hammer_and_keyboard_in_star2.svg";
import star from "../../assets/Prismatic-Star-16.svg";
import starInCircle from "../../assets/star-in-circle.svg";
import punkStar from "../../assets/spite-Punk-Star.svg";
import golden from "../../assets/Golden-Crescent-Moon-And-Star-Enhanced-Without-Background.svg";

type CardProps = {
  symbol: number;
  isOpened: boolean;
  isGuessed: boolean;
  handleClick: () => void;
};

export function Card({ symbol, isOpened, isGuessed, handleClick }: CardProps) {
  function getSymbol(symbol: number) {
    switch (symbol) {
      case 0:
        return <img src={blackLuna} alt="black luna" />;
      case 1:
        return <img src={redLuna} alt="red luna" />;
      case 2:
        return <img src={penta} alt="penta" />;
      case 3:
        return <img src={golden} alt="golden crescent" />;
      case 4:
        return <img src={hammerKeyboard} alt="hammer and keayboard" />;
      case 5:
        return <img src={star} alt="star" />;
      case 6:
        return <img src={starInCircle} alt="starInCircle" />;
      case 7:
        return <img src={punkStar} alt="punk star" />;
      default:
        return symbol;
    }
  }

  return (
    <div>
      {isOpened ? (
        <div className={`${styles.card} ${isGuessed ? styles.disabled : ""}`}>
          {getSymbol(symbol)}
        </div>
      ) : (
        <div className={styles.cardBack} onClick={handleClick}>
          <img src={cardBackSvg} alt="card back" />
        </div>
      )}
    </div>
  );
}
