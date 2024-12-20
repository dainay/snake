import s from "./Board.module.scss";
import Snake from "../snake/Snake";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Item from "../item/Item";
import { generateRandomCoordinates } from "../../utils/utils";
import { reversedControls } from "../../utils/utils";
import { defaultControls } from "../../utils/utils";
import GameOver from "../gameOver/GameOver";
import useStore from "../../utils/store";
import { flashUser } from '../../utils/utils';
import { runStudents } from '../../utils/utils';
import useGameStore from "../walls/Walls";
import Win from "../win/Win";


const Board = () => {
  // console.log('Board component');

  const deplace = 25; // the difference between the head and the next element of the snake

  const { mode: storeMode, removeMode, addMode } = useStore();

  const [snakeData, setSnakeData] = useState([
    [0, 0]
  ]);

  const [foodData, setFoodData] = useState([]);
  const [trapData, setTrapData] = useState([]);


  const timer = useRef(0);
  const foodTimer = useRef(0);
  const trapTimer = useRef(0);
  const direction = useRef("RIGHT");
  const cantChangeDirection = useRef(true);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(0.5);
  const [score, setScore] = useState(1);
  const [hasWon, setHasWon] = useState(false);
  const walls = useGameStore.getState().walls; // Get the walls from the Zustand store


  const [segmentRotations, setSegmentRotations] = useState([0]);
  // console.log('Direction:', direction);

  const wallAudio = [
    "/audio/wall1.mp3",
    "/audio/wall2.mp3"
  ];
 
  
  const eatAudio = [
    "/audio/push.mp3",
    "/audio/blind.mp3"
  ];
  const { mode } = useStore();

  useEffect(() => {
    if (mode.includes("impossible")) {
      setSpeed(0.02);
    }
  }, [mode]);

  const rotationMap = {
    UP: 270,
    DOWN: 90,
    LEFT: 180,
    RIGHT: 0,
  };
  const [rotation, setRotation] = useState(rotationMap["RIGHT"]);

  const gameIsOver = () => {
    console.log("GAME OVER");
    gsap.ticker.remove(gameLoop); // Stop the game loop
    setGameOver(true);
  };
  

  const replay = () => {
    setGameOver(false);
    setHasWon(false);
    setSnakeData([
      [0, 0]
    ]);
    setFoodData([]);
    setTrapData([]);
    setSegmentRotations([0]);
    direction.current = "RIGHT";
    timer.current = 0;
    foodTimer.current = 0;
    trapTimer.current = 0;
    setSpeed(0.5);
    setScore(1);
    removeMode("impossible");
    removeMode("corner");
  };

  const hasEatenItem = ({ getter, setter, type, newSnakeData, newSegmentRotations }) => {
    const head = snakeData[snakeData.length - 1];
  
    const match = getter.find(
      (_item) => head[0] === _item.x && head[1] === _item.y
    );
  
    if (match) {
      const newItemData = getter.filter((_item) => _item !== match);
      setter(newItemData);
  
      if (type === "food") {
        if (speed > 0.05) {
          setSpeed(speed - 0.01);
        }
        return "food";
      }
  
      if (type === "trap") {
        console.log(newSnakeData, "newSnakeData before effect")
        const effects = [flashUser, () => runStudents(newSnakeData, newSegmentRotations)];
        
        const selectedEffect = effects[Math.floor(Math.random() * effects.length)];

        if (selectedEffect === effects[1]  && snakeData.length > 2) { // Check if the selected effect is runStudents
          setScore((prev) => prev - 2);
        }
      
        selectedEffect(); // Apply the selected effect

        console.log(newSnakeData, "newSnakeData before effect")

        return { newSnakeData, newSegmentRotations };
      }
    }
  
    return false;
  };
  
  
  const snakeCollapsed = () => {
    let head = snakeData[snakeData.length - 1];
    let snake = [...snakeData]; //create copy of the snake

    snake.pop(); //remove the head of the snake to not compare head with itself

    for (let i = 0; i < snake.length; i++) {
      if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
        return true;
      }
    }

    return false;
  };



  const snakeHitsWall = () => {
    let head = snakeData[snakeData.length - 1]; // Get the snake's head 
    
    for (let i = 0; i < walls.length; i++) {
      if (head[0] === walls[i].x && head[1] === walls[i].y) {
        return true; // Collision detected
      }
    }
  
    return false; // No collision
  };
  

  const moveSnake = () => {
    let newSnakeData = [...snakeData];
    let newSegmentRotations = [...segmentRotations];
    let head = newSnakeData[newSnakeData.length - 1];
    let headRotation = rotation;
  
    switch (direction.current) {
      case "UP":
        head = [head[0], head[1] - deplace];
        headRotation = rotationMap["UP"];
        break;
      case "DOWN":
        head = [head[0], head[1] + deplace];
        headRotation = rotationMap["DOWN"];
        break;
      case "LEFT":
        head = [head[0] - deplace, head[1]];
        headRotation = rotationMap["LEFT"];
        break;
      case "RIGHT":
        head = [head[0] + deplace, head[1]];
        headRotation = rotationMap["RIGHT"];
        break;
      default:
        break;
    }
  
    newSnakeData.push(head);
    newSegmentRotations.push(headRotation);
  
    // Check if the snake eats food or hits a trap
    const eatenFood = hasEatenItem({ getter: foodData, setter: setFoodData, type: "food", newSnakeData, newSegmentRotations });

    const hitTrap = hasEatenItem({ getter: trapData, setter: setTrapData, type: "trap", newSnakeData, newSegmentRotations });
  
    if (eatenFood) {
      // Update score if food was eaten
      setScore((prev) => prev + 1);
      console.log('Food eaten, updating score kkkkkkkkkkkkk');

    } else if (hitTrap) {

      newSnakeData.shift();
      newSegmentRotations.shift();

      console.log('GENERAL HIT TRAP WITH NO EFFECT');
    } else {
      // If nothing was eaten, remove the tail
      console.log('Nothing was eaten, removing tail kkkkkkkkk');
      newSnakeData.shift();
      newSegmentRotations.shift();
    }

   if (score >= 30) {
      winGame();
      return; // Exit the function to stop further logic
    }
    setSnakeData(newSnakeData);
    setSegmentRotations(newSegmentRotations);

    if (isOutOfBoard() || snakeHitsWall(newSnakeData, walls)) {
      const wallAudioFile = wallAudio[Math.floor(Math.random() * wallAudio.length)];
      const audio = new Audio(wallAudioFile); // Use the selected file path
      audio.currentTime = 0;
      audio.play();
      gameIsOver();
    }
    
    if (snakeCollapsed()) {
      const eatAudioFile = eatAudio[Math.floor(Math.random() * eatAudio.length)];
      const audio = new Audio(eatAudioFile); // Use the selected file path
      audio.currentTime = 0;
      audio.play();
      gameIsOver();
    }
    
  };
  
  const isOutOfBoard = () => {
    const head = snakeData[snakeData.length - 1];
    if ((head[0] < 0 || head[0] >= 850) || (head[1] < 0 || head[1] >= 525)) {
      return true;
    }

    return false;
  };

  const onKeyDown = (e) => {
    if (cantChangeDirection.current === false) return; //to make change directlon only when it was updated visually

    cantChangeDirection.current = false;

  
    if (mode.includes("reversed")) {
      reversedControls(e, direction);
    } else {
      defaultControls(e, direction);
    }

  };

  const addItem = ({getter, setter}) => {
    // console.log('ADD FOOD');
    // generateRandomCoordinates(mode);

    let coordinates = generateRandomCoordinates(mode);
    // console.log('Food:', food);
    setter((prev) => [...prev, coordinates]);

    // console.log('Food data:', foodData);
  };

  const gameLoop = (time, deltaTime, frame) => {
    if (gameOver || hasWon) {
      gsap.ticker.remove(gameLoop); // Stop the game loop if game is over
      return;
    }
  
    timer.current += deltaTime * 0.001;
    foodTimer.current += deltaTime * 0.001;
    trapTimer.current += deltaTime * 0.001;
  
    if (timer.current > (mode.includes("impossible") ? 0.04 : speed)) {
      timer.current = 0;
      moveSnake();
      cantChangeDirection.current = true;
    }
  
    if (foodTimer.current > 3 && foodData.length < 10) {
      foodTimer.current = 0;
      addItem({ getter: foodData, setter: setFoodData });
    }
  
    if (trapTimer.current > 8 && trapData.length < 7) {
      trapTimer.current = 0;
      addItem({ getter: trapData, setter: setTrapData });
    }
  };
  
  const winGame = () => {
    console.log("YOU WIN!");
    gsap.ticker.remove(gameLoop); 
    setHasWon(true); 
  };


  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    gsap.ticker.add(gameLoop);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      gsap.ticker.remove(gameLoop);
    };
  }, [snakeData]);

 

  return (
    <>
      <div className={s.back}>
        <div className={s.board}>
          {/* <img src="/back.jpg" alt="" /> */}

          <span className={s.score}> {score}/ 30 students </span>
          <Snake data={snakeData} segmentRotations={segmentRotations}></Snake>
          {foodData.map((food) => {
            // console.log('Food DDDDDDDDDDDDDD:', food);
            return <Item key={food.id} coordonates={food} type='food'></Item>;
          })}

          {trapData.map((trap) => {
            // console.log('Food DDDDDDDDDDDDDD:',    trap);
            return <Item key={trap.id} coordonates={trap} type='trap'></Item>;
          })}

        </div>

       
      </div>

     
      {hasWon && <Win replay={replay} />}
      {gameOver && <GameOver replay={replay}></GameOver>}
    </>
  );
};

export default Board;
