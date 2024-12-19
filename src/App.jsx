import {useState, useEffect, useRef} from 'react';
import Board from "./components/board/Board";
 import s from './App.module.scss';
 import Toggle from "./components/toggle/Toggle";
//  import {useDropzone} from 'react-dropzone';
import Rules from "./components/rules/Rules";

function App() {
  // const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
  //   accept: 'image/*',
  //   onDrop: acceptedFiles => {
  //     // console.log(acceptedFiles);
  //   }
        
  // });

  // const files = acceptedFiles.map(file => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  const [isGameStarted, setIsGameStarted] = useState(false);

  const backgroundMusic = useRef(null); // Reference for background music

  useEffect(() => {
    const startMusicOnInteraction = () => {
      if (!backgroundMusic.current) {
        backgroundMusic.current = new Audio("/audio/background.mp3");
        backgroundMusic.current.loop = true;
        backgroundMusic.current.volume = 0.5;
        backgroundMusic.current.play().catch((error) => {
          console.error("Background music playback failed:", error);
        });
      }
  
      // Remove event listeners after the music starts
      document.removeEventListener("click", startMusicOnInteraction);
      document.removeEventListener("keydown", startMusicOnInteraction);
      document.removeEventListener("mousedown", startMusicOnInteraction);
    };
  
    document.addEventListener("click", startMusicOnInteraction); // Trigger on click
    document.addEventListener("keydown", startMusicOnInteraction); // Trigger on keypress
    document.addEventListener("mousedown", startMusicOnInteraction); // Trigger on mouse button press
  
    return () => {
      document.removeEventListener("click", startMusicOnInteraction);
      document.removeEventListener("keydown", startMusicOnInteraction);
      document.removeEventListener("mousedown", startMusicOnInteraction);
    };
  }, []);
  

  const startGame = () => {
    setIsGameStarted(true);
  };

  return (
    <div className="App ">
      <div className="flashbang">Nox !</div>

      <div className={s.back}></div>
      
      {/* Show Rules Popup if game hasn't started */}
      {!isGameStarted && <Rules onStart={startGame} />}

      {/* Show Board only if the game has started */}
      {isGameStarted && <Board />}

      <div className="toggle-wrapper">   
      <Toggle mode={"corner"}></Toggle>
      <Toggle mode={"impossible"}></Toggle>
      <Toggle mode={"reversed"}></Toggle>
      </div>
 

    </div>
  );
}

export default App;
