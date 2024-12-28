import s from "./Win.module.scss";
import { useEffect, useRef } from "react";

const Win = ({ replay }) => {
  const endAudioRef = useRef(null);

  useEffect(() => {
    // Play the end audio
    const endAudio = new Audio("audio/end.mp3");
    endAudio.play();
    endAudioRef.current = endAudio; // Save the audio instance to the ref
  }, []);

  const handleReplay = () => {
    // Stop the end audio
    if (endAudioRef.current) {
      endAudioRef.current.pause();
      endAudioRef.current.currentTime = 0;
    }

    // Call the replay function
    replay();
  };


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
            <button onClick={handleReplay}>We need more DA members!</button>
            <a className={s.link} href="https://dariaiarovaia.great-site.net/">Who are you?</a>
                  </div>
        </div>
    </div>
  );
};

export default Win;
