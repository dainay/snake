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
  const [speed, setSpeed] = useState(0.4);
  const [score, setScore] = useState(0);

  const [segmentRotations, setSegmentRotations] = useState([0]);
  // console.log('Direction:', direction);

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
    setSpeed(0.4);
    setScore(0);
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
        
        // const selectedEffect = effects[Math.floor(Math.random() * effects.length)];
        const selectedEffect = effects[1];
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
      setScore((prev) => prev + 10);
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
  
    setSnakeData(newSnakeData);
    setSegmentRotations(newSegmentRotations);

    if (isOutOfBoard() || snakeCollapsed()) {
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
    if (gameOver) {
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
  
    if (foodTimer.current > 0.1 && foodData.length < 100) {
      foodTimer.current = 0;
      addItem({ getter: foodData, setter: setFoodData });
    }
  
    if (trapTimer.current > 2 && trapData.length < 15) {
      trapTimer.current = 0;
      addItem({ getter: trapData, setter: setTrapData });
    }
  };
  

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    gsap.ticker.add(gameLoop);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      gsap.ticker.remove(gameLoop);
    };
  }, [snakeData]);

  const walls = [
    { x: 125, y: 150 }, { x: 125, y: 175 }, { x: 125, y: 200 }, { x: 125, y: 225 }, { x: 125, y: 250 },
    { x: 125, y: 275 }, { x: 125, y: 300 }, { x: 125, y: 325 }, { x: 125, y: 350 }, { x: 125, y: 375 },
    { x: 125, y: 400 }, { x: 125, y: 425 }, { x: 125, y: 450 }, { x: 150, y: 150 }, { x: 175, y: 150 },
    { x: 200, y: 150 }, { x: 225, y: 150 }, { x: 250, y: 150 }, { x: 275, y: 150 }, { x: 300, y: 150 },
    { x: 275, y: 150 }, { x: 525, y: 150 }, { x: 525, y: 175 }, { x: 525, y: 200 }, { x: 525, y: 225 },
    { x: 525, y: 250 }, { x: 525, y: 275 }, { x: 525, y: 300 },
    { x: 550, y: 300 }, { x: 575, y: 300 }, { x: 600, y: 300 }, { x: 625, y: 300 }, { x: 650, y: 300 },
    { x: 675, y: 300 }, { x: 700, y: 300 }, { x: 725, y: 300 }, { x: 750, y: 300 }, { x: 775, y: 300 },
    { x: 800, y: 300 }, { x: 825, y: 300 },
    { x: 575, y: 325 }, { x: 575, y: 350 }, { x: 575, y: 375 }, { x: 575, y: 400 }, { x: 575, y: 425 },
    { x: 375, y: 500 }, { x: 375, y: 475 }, { x: 375, y: 450 }, { x: 375, y: 425 } 
  ];
  

  return (
    <>
      <div className={s.back}>
        <div className={s.board}>
          {/* <img src="/back.jpg" alt="" /> */}

          <span className={s.score}> Score : {score}</span>
          <Snake data={snakeData} segmentRotations={segmentRotations}></Snake>
          {foodData.map((food) => {
            // console.log('Food DDDDDDDDDDDDDD:', food);
            return <Item key={food.id} coordonates={food} type='food'></Item>;
          })}

          {trapData.map((trap) => {
            // console.log('Food DDDDDDDDDDDDDD:',    trap);
            return <Item key={trap.id} coordonates={trap} type='trap'></Item>;
          })}


          {walls.map((wall, index) => { return ( <div key={index} className={s.wall} style={{ transform: `translate(${wall.x}px, ${wall.y}px)` }}></div> ); })}
        </div>

       
      </div>

      <div className={s.mapWrapper}>
          <div className={`${s.map} ${s['map-left']}`}>
          <img src=" /map-left.jpg" alt="" /></div>
          <div className={`${s.map} ${s['map-right']}`}>
          <img src=" /map-right.jpg" alt="" /></div>
      </div>

      {gameOver && <GameOver replay={replay}></GameOver>}
    </>
  );
};

export default Board;
