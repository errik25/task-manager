import './About.css';
import React, {useState, useEffect, useRef} from 'react';

function About() {
  const stateRef = useRef({});
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({width: 800, height: 600})

  useEffect(() => {
    let state = stateRef.current;
    state.mouseDown = false;
    state.cursorPos = null;
    state.prevCursorPo = null;
    state.mouseDownPosition = {x: 0, y: 0};
    state.savedImages = [];
    state.redoImages = [];
  }, [])
  
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
    let state = stateRef.current;
    const currentImage = ctx.getImageData(0, 0, canvasSize.width, canvasSize.height);
    state.redoImages.push(currentImage)
  }

  const saveCurrentToUndoStack = (ctx) => {
    let state = stateRef.current;
    const currentImage = ctx.getImageData(0, 0, canvasSize.width, canvasSize.height);
    state.savedImages.push(currentImage)
  }

  const applyPrevImage = (ctx) => {
    let state = stateRef.current;
    const prevImage = state.savedImages[state.savedImages.length - 1];
    ctx.putImageData(prevImage, 0, 0);
  }

  const applyNextImage = (ctx) => {
    let state = stateRef.current;
    const nextImage = state.redoImages[state.redoImages.length - 1];
    ctx.putImageData(nextImage, 0, 0);
  }

  const popPrevStack = () => {
    let state = stateRef.current;
    state.savedImages.pop();
  } 

  const popNextStack = () => {
    let state = stateRef.current;
    state.redoImages.pop();
  }

  const clearNextStack = () => {
    let state = stateRef.current;
    state.redoImages = [];
  }

  const drawOnMousePos = ({x: cx, y: cy}) => {
    let state = stateRef.current;
    const ctx = canvasRef.current.getContext('2d');

    ctx.fillStyle = '#a4349f';
    ctx.strokeStyle = '#a4349f';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(state.prevCursorPos.x, state.prevCursorPos.y);
    ctx.lineTo(state.cursorPos.x, state.cursorPos.y);
    ctx.stroke()
    clearNextStack()
  }

  useEffect(() => {
    let state = stateRef.current;
    draw()
    window.addEventListener('mouseup', (e) => {
      state.mouseDown = false;
    })
    state.redoImages = [];
  }, [])

  const undo = () => {
    let state = stateRef.current;
    if (state.savedImages.length) {
      const ctx = canvasRef.current.getContext('2d');
      saveCurrentToRedoStack(ctx)
      applyPrevImage(ctx)
      popPrevStack()
    }
  }

  const redo = () => {
    let state = stateRef.current;
    if (state.redoImages.length) {
      const ctx = canvasRef.current.getContext('2d'); 

      saveCurrentToUndoStack(ctx);
      applyNextImage(ctx);
      popNextStack();
    }
  }

  const getCursorPos = (e) => {
    return {x: event.layerX, y: event.layerY};
  }

  const clickHandler = (e) => {
    const {x, y} = getCursorPos(e) 
  }

  const mouseMove = (e) => {
    let state = stateRef.current;
    const {x, y} = getCursorPos(e)
    state.prevCursorPos = state.cursorPos;
    state.cursorPos = {x, y};
    if (state.mouseDown) {
      drawOnMousePos(state.cursorPos)
    }
  }

  const mouseDownHandler = (e) => {
    let state = stateRef.current;
    const ctx = canvasRef.current.getContext('2d');
    saveCurrentToUndoStack(ctx)
    state.mouseDown = true;
  }

  return (
    <div className="about">
      <div className="about__buttons">
        <div className="about__clearAll" onClick={draw}>
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
        width={canvasSize.width}
        height={canvasSize.height}
        ref={canvasRef}
        style={{border: '1px solid black'}}
      />
    </div>
  );
}

export default About;
