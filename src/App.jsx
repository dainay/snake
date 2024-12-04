 import Board from "./components/board/Board";
 import s from './App.module.scss';
 import Toggle from "./components/toggle/Toggle";
 import {useDropzone} from 'react-dropzone';

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

  return (
    <div className="App ">
      <div className="flashbang">Nox !</div>

      <div className={s.back}></div>
      <Board></Board>

      {/* <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section> */}
   
      <div className="toggle-wrapper">   
        <Toggle mode={"corner"}></Toggle>
        <Toggle mode={"impossible"}></Toggle>
        <Toggle mode={"reversed"}></Toggle>
        </div>
    </div>
  );
}

export default App;
