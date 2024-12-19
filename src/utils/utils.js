import uniqid from "uniqid";
import gsap from "gsap";
import useStore from "./store";
import useGameStore from "../components/walls/Walls";

export const generateRandomCoordinates = (mode) => {
  // console.log('GENERATE RANDOM COORDINATES');

  // console.log(mode, 'mode into utils');

  const id = uniqid();
  const walls = useGameStore.getState().walls; // Get the walls from the Zustand store

  let boardWidth = 850;
  let boardHeight = 525;
  let cellSize = 25;

  let x, y;

  const isWall = (x, y) => walls.some((wall) => wall.x === x && wall.y === y);// test that there si not match with walls

  do {
    if (mode.includes("corner")) {
      // console.log('corner mode');

      const side = Math.random();
      let maxCellsY = Math.floor(boardHeight / cellSize);
      let maxCellsX = Math.floor(boardWidth / cellSize);

      if (side <= 0.25) {
        // Left border
        x = 0;
        y = Math.floor(Math.random() * maxCellsY) * cellSize;
      } else if (side <= 0.5) {
        // Top border
        x = Math.floor(Math.random() * maxCellsX) * cellSize;
        y = 0;
      } else if (side <= 0.75) {
        // Right border
        x = (maxCellsX - 1) * cellSize;
        y = Math.floor(Math.random() * maxCellsY) * cellSize;
      } else {
        // Bottom border
        x = Math.floor(Math.random() * maxCellsX) * cellSize;
        y = (maxCellsY - 1) * cellSize;
      }
    } else {
      let maxCellsX = Math.floor(boardWidth / cellSize);
      let maxCellsY = Math.floor(boardHeight / cellSize);

      x = Math.floor(Math.random() * maxCellsX) * cellSize;
      y = Math.floor(Math.random() * maxCellsY) * cellSize;
    }

    // console.log(x, y, id, 'x, y, id');
  } while (isWall(x, y));

  return { x, y, id };
};

export function defaultControls(e, direction) {
  switch (e.keyCode) {
    case 38:
      // console.log('UP');
      if (direction.current !== "DOWN") {
        direction.current = "UP";
      }
      break;
    case 40:
      // console.log('DOWN');
      if (direction.current !== "UP") {
        direction.current = "DOWN";
      }
      break;
    case 37:
      // console.log('LEFT');
      if (direction.current !== "RIGHT") {
        direction.current = "LEFT";
      }
      break;
    case 39:
      // console.log('RIGHT');
      if (direction.current !== "LEFT") {
        direction.current = "RIGHT";
      }
      break;
    default:
      break;
  }
}

export function reversedControls(e, direction) {
  switch (e.keyCode) {
    case 38:
      // console.log('UP');
      if (direction.current !== "UP") {
        direction.current = "DOWN";
      }
      break;
    case 40:
      // console.log('DOWN');
      if (direction.current !== "DOWN") {
        direction.current = "UP";
      }
      break;
    case 37:
      // console.log('LEFT');
      if (direction.current !== "LEFT") {
        direction.current = "RIGHT";
      }
      break;
    case 39:
      // console.log('RIGHT');
      if (direction.current !== "RIGHT") {
        direction.current = "LEFT";
      }
      break;
    default:
      break;
  }
}

const bang = new Audio("/audio/bang.mp3");
let flashTween = null;



const profTrapAudio = [
      "/audio/go.mp3",
      "/audio/go2.mp3",
      "/audio/norris.mp3",
      "/audio/norris2.mp3",
      "/audio/look.mp3",
      "/audio/peevz.mp3",
      "/audio/run.mp3"
]

const profTrapAudioSmall = [
    "/audio/norris.mp3",
    "/audio/norris2.mp3",
    "/audio/peevz.mp3", 
]

const noxAudio = [
      "/audio/nox.mp3",
      "/audio/nox2.mp3",
      "/audio/nox3.mp3"
]

  
 

export const runStudents = (newSnakeData, newSegmentRotations) => {
  if (newSnakeData.length > 3) {

    const profTrapAudioFile = profTrapAudio[Math.floor(Math.random() * profTrapAudio.length)];
    const audio = new Audio(profTrapAudioFile ); 
    audio.currentTime = 0;
    audio.play();


    newSnakeData.splice(-2, 2);
    console.log("INSIDE THE RUN STUDENTS after removing 2 parts of the snake");
    newSegmentRotations.splice(-2, 2);
  } else {
    console.log(
      "INSIDE THE RUN STUDENTS Snake is too short to apply trap effect."
    );
    const profTrapAudioSmallFile = profTrapAudioSmall[Math.floor(Math.random() * profTrapAudioSmall.length)];
    const audio = new Audio(profTrapAudioSmallFile ); 
    audio.currentTime = 0;
    audio.play();
  }
};

export const flashUser = () => {
  if (flashTween) flashTween.kill();

  
  const noxAudioFile = noxAudio[Math.floor(Math.random() * noxAudio.length)];
    const audio = new Audio(noxAudioFile ); 
    audio.currentTime = 0;
    audio.play();

  document.querySelector(".flashbang").style.opacity = "1";

  flashTween = gsap.to(".flashbang", {
    opacity: 0,
    duration: 4,
    delay: 2,
  });
};

export const triggerMode = () => {
  // console.log('TRIGGER MODE');
  const modes = ["corner", "impossible", "reversed"];
  const selectedMode = modes[Math.floor(Math.random() * modes.length)];

  useStore.getState().addMode(selectedMode);

  setTimeout(() => {
    // console.log('set timeout');
    useStore.getState().removeMode(selectedMode);
  }, 2000);
};
