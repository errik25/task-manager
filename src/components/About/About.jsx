import './About.css';
import React, {useState, useEffect, useRef} from 'react';
import Canvas from './Canvas.jsx';

function About() {
  const [mouseDown, setMouseDown] = useState(false);
  const [cursorPos, setCursorPos] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(600);
  const canvasRef = useRef(null);

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#33a935'
    ctx.rect(0, 0, 800, 600)
    ctx.fill();

    ctx.fillStyle = '#a4349f';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
  };

  const drawPixel = ({x: cx, y: cy}) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = 800;
    let h = 600;
    // const imageData = ctx.createImageData(800, 600);
    const imageData = ctx.getImageData(0, 0, w, h);
    for (let i = 0, x = 0, y = 0; i < imageData.data.length; i += 4, x ++) {
      
      if (x === w) {
        x = 0;
        y++;
      }
        
      if ((y > cy - 30 && y < cy + 30) && (x > cx - 30 && x < cx + 30))  {
        imageData.data[i + 0] = 255;
        imageData.data[i + 1] = 25;
        imageData.data[i + 2] = 25;
        imageData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }


  useEffect(() => {
    console.log('mounted')
    draw()
    window.addEventListener('mouseup', (e) => {
      setMouseDown(false);
    })
  }, [])
  
  useEffect(() => {
    // console.log('useEffect update')
    // draw()

    if (mouseDown) {
      drawPixel(cursorPos)
    }
  })

  const getCursorPos = (e) => {
    return {x: event.layerX, y: event.layerY};
  }

  const clickHandler = (e) => {
    const {x, y} = getCursorPos(e)
    
    console.log('click', x, y)
  }

  const mouseMove = (e) => {
    const {x, y} = getCursorPos(e)
    setCursorPos({x, y});
    // console.log('over', x, y)
  }

  const mouseDownHandler = (e) => {
    setMouseDown(true)
  }

  return (
    <div className="App">
      <div>
        hello
      </div>
      <canvas 
        onClick={clickHandler}
        onMouseMove={mouseMove}
        onMouseDown={mouseDownHandler}
        width={canvasWidth}
        height={canvasHeight}
        ref={canvasRef}
        style={{border: '1px solid black'}}
      />
    </div>
  );
}

export default About;
