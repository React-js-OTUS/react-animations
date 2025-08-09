import ChangeHeightMotion from "../ChangeHeightMotion";
import "./index.css";

const Card = ({ text, idx }: { text: string; idx: number }) =>
  !text ? null : (
    <div className="card">
      <div className="title">Card {["One", "Two", "Three"][idx]}</div>
      <ChangeHeightMotion reanimate={text} duration={0.8} ease={"easeOut"}>
        <div className="text">{text}</div>
      </ChangeHeightMotion>
    </div>
  );

export default Card;

// Теперь осталось обернуть в ChangeHeightMotion компонент, который меняет высоту,
// и передать переменную для реанимации. В нашем случае изменяющийся по высоте компонент -
// это div с текстом
