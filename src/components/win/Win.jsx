import s from "./Win.module.scss";

const Win = ({ replay }) => {
  return (
    <div className={s.win}>
      <div className={s.wrapper}>
        <img className={s.managed} src="/win.png" alt="" />
        <div className={s.text}>
            <p>
              The Room of Requirement bursts with laughter and relief as the last
              student arrives. All 30 students stand united, ready to resist and
              fight for what is right.{" "}
            </p>
            <p>
              {" "}
              You’ve outwitted the professors and brought the DA together for one
              more night of magic.
            </p>
            <blockquote>
              "Why worry about getting in trouble when it’s so much fun to cause?" —
              George Weasley
            </blockquote>
            <button onClick={replay}>We need more DA members!</button>
            <a className={s.link} href="dariaiarovaia.greatsite.net">Who are you?</a>
                  </div>
        </div>
    </div>
  );
};

export default Win;
