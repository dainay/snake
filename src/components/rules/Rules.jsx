import s from "./Rules.module.scss";

const Rules = ({ onStart }) => {
  return (
    <div className={s.rules}>
          
      <div className={s.wrapper}>
          
          <h2>Are you ready, a little Marauder?</h2>
          <p>
            Because of the Umbridge regime at Hogwarts, protection against dark magic classes have been canceled, and the castle is under strict surveillance. Harry Potter needs your help to gather all the members of Dumbledore's Army for one final, secret night lesson in the Room of Requirement. To aid you in this mission, he has entrusted you with the Marauder’s Map—a magical artifact of unparalleled brilliance.
            <br /><br />
            Hermione’s carefully crafted list reveals there are 35 students to find. But beware! The professors are prowling the halls, and their sharp eyes will catch even the faintest glimmer of light. If they get too close, the frightened students might scatter, slipping from your grasp.
            <br /><br />
            From time to time, your friends may help by casting Nox, extinguishing their wandlight to avoid detection. But they aren’t always as clever or quick as they should be, so stay alert, and use your wits to outsmart those who would stop you.
            <br /><br />
            Thirty five students. As soon as you have all of them, "Mischief Managed"...
            <br /><br />
            Good luck!
          </p>
          <img className={s.nogood} title='start' onClick={onStart} src="/nogood.png" alt="" />
      </div>
    </div>
  );
};

export default Rules;
