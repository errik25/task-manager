import './About.css';
import React, {useState, useEffect, useRef} from 'react';

function About() {
  const [mouseDown, setMouseDown] = useState(false);
  const [cursorPos, setCursorPos] = useState(null);
  const [prevCursorPos, setPrevCursorPos] = useState(null);
  const [mouseDownPosition, setMouseDownPosition] = useState({x: 0, y: 0});
  const [savedImages, setSavedImages] = useState([]);
  const [redoImages, setRedoImages] = useState([]);
  const [canvas, setCanvas] = useState({width: 800, height: 600})
  const canvasRef = useRef(null);

  const draw = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = '#33a935';
    ctx.rect(0, 0, 800, 600);
    ctx.fill();

    ctx.fillStyle = '#a4349f';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
  };

  const saveCurrentToRedoStack = (ctx) => {  
    const currentImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setRedoImages(prev => [...prev, currentImage])
  }

  const saveCurrentToUndoStack = (ctx) => {
    const currentImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setSavedImages(prev => [...prev, currentImage])
  }

  const applyPrevImage = (ctx) => {
    const prevImage = savedImages[savedImages.length - 1];
    ctx.putImageData(prevImage, 0, 0);
  }

  const applyNextImage = (ctx) => {
    const nextImage = redoImages[redoImages.length - 1];
    ctx.putImageData(nextImage, 0, 0);
  }

  const popPrevStack = () => {
    setSavedImages(savedImages.slice(0, savedImages.length - 1));
  } 

  const popNextStack = () => {
    setRedoImages(redoImages.slice(0, redoImages.length - 1));
  }

  const clearNextStack = () => {
    setRedoImages([]);
  }

  const drawOnMousePos = ({x: cx, y: cy}) => {
    const ctx = canvasRef.current.getContext('2d');

    ctx.fillStyle = '#a4349f';
    ctx.strokeStyle = '#a4349f';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(prevCursorPos.x, prevCursorPos.y);
    ctx.lineTo(cursorPos.x, cursorPos.y);
    ctx.stroke()
    clearNextStack()
  }

  useEffect(() => {
    console.log('mounted')
    clearAll();
    window.addEventListener('mouseup', (e) => {
      setMouseDown(false);
    })
    setRedoImages([]);
  }, [])

  const clearAll = () => {
    draw()
  }

  const undo = () => {
    if (savedImages.length) {
      const ctx = canvasRef.current.getContext('2d');
      saveCurrentToRedoStack(ctx)
      applyPrevImage(ctx)
      popPrevStack()
    }
  }

  const redo = () => {
    if (redoImages.length) {
      const ctx = canvasRef.current.getContext('2d'); 

      saveCurrentToUndoStack(ctx);
      applyNextImage(ctx);
      popNextStack();
    }
  }
  
  useEffect(() => {
    if (mouseDown) {
      drawOnMousePos(cursorPos)
    }
  }, [cursorPos])

  const getCursorPos = (e) => {
    return {x: event.layerX, y: event.layerY};
  }

  const clickHandler = (e) => {
    const {x, y} = getCursorPos(e) 
  }

  const mouseMove = (e) => {
    const {x, y} = getCursorPos(e)
    setPrevCursorPos(cursorPos);
    setCursorPos({x, y});
  }

  const mouseDownHandler = (e) => {
    const ctx = canvasRef.current.getContext('2d');
    saveCurrentToUndoStack(ctx)
    setMouseDown(true)
  }

  return (
    <div className="about">
      <div className="about__buttons">
        <div className="about__clearAll" onClick={clearAll}>
          clear all
        </div>
        <div className="about__undo" onClick={undo}>
          undo
        </div>
        <div className="about__undo" onClick={redo}>
          redo
        </div>
      </div>

      <canvas 
        onClick={clickHandler}
        onMouseMove={mouseMove}
        onMouseDown={mouseDownHandler}
        width={canvas.width}
        height={canvas.height}
        ref={canvasRef}
        style={{border: '1px solid black'}}
      />
    </div>
  );
}

export default About;
