import s from "./Rules.module.scss";

const Rules = ({ onStart }) => {
  return (
    <div className={s.rules}>
          
      <div className={s.wrapper}>
          
          <h2>Are you ready, a little Marauder?</h2>
          <p>
            Because of the Umbridge regime at Hogwarts, protection against dark magic classes have been canceled, and the castle is under strict surveillance. Harry Potter needs your help to<span className="bolder"> gather all the members</span> of Dumbledore's Army for one final, secret night lesson in the Room of Requirement. To aid you in this mission, he has entrusted you with the Marauder’s Map—a magical artifact of unparalleled brilliance.
            <br /><br />
            Hermione’s carefully crafted list reveals there are <span className="bolder">30 students to find</span>. But beware! <span className="bolder">The professors are prowling the halls</span>, and their sharp eyes will catch even the faintest glimmer of light. If they get too close, <span className="bolder">the frightened students might scatter</span>, slipping from your grasp.
            <br /><br />
            From time to time, your <span className="bolder">friends may help by casting Nox</span> to avoid detection. But they aren’t always as clever or quick as they should be, so stay alert, and use your wits to outsmart those who would stop you.
            <br /><br />
            Thirty  students. As soon as you have all of them, "Mischief Managed"...
            <br /><br />
            <span className="bolder">Good luck!</span>
          </p>
          <img className={s.nogood} title='start' onClick={onStart} src="/nogood.png" alt="" />
      </div>
    </div>
  );
};

export default Rules;
