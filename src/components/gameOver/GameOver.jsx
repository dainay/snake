import s from "./GameOver.module.scss";

const GameOver = ({ replay }) => {
  return (
    <div className={s.gameOver}>
      <div className={s.content}>
          <h1>Euh...</h1>
          <p>
            <quoteblock>
              “Even the best witches and wizards stumble at times.”
            </quoteblock> <br /><br />
            The corridors of Hogwarts fall silent as your journey comes to an end.
            The professors’ watchful eyes proved too sharp, or perhaps the
            challenges too great this time.
          </p>
          <p>
            Gather your courage, sharpen your skills, and return to the Marauder’s
            Map. Hogwarts awaits your next daring attempt.
          </p>
          <button className={s.replay} onClick={replay}>
            I can do it !
          </button>
      </div>
    </div>
  );
};

export default GameOver;
