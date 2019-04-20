import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



const App = () => {
  const width = 250
  const height = 100
  const [canvas, setCanvas] = useState(null)
  const ctx = useMemo(() => canvas && canvas.getContext('2d'), [canvas])
  const [drawing, setDrawing] = useState(false)
  return (
    <div className='wrapper' width={width} height={height}>
      <canvas
        width={width}
        height={height}
        ref={setCanvas}
        className='canvas'
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
      />
      <CloseButton />
    </div>
  )
  function CloseButton() {
    return (
      <div className='btn' onClick={() => ctx.clearRect(0, 0, width, height)}>
        <span className='btn__primary'>x</span>
      </div>
    )
  }
  function getElementPosition(e) {
    const element = canvas.getBoundingClientRect()
    const x = e.clientX - element.left
    const y = e.clientY - element.top
    return { x, y }
  }
  function onMouseDown(event) {
    setDrawing(true)
    const { x, y } = getElementPosition(event)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }
  function onMouseUp(event) {
    setDrawing(false)
  }
  function onMouseMove(event) {
    if (drawing) {
      const { x, y } = getElementPosition(event)
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }
}




ReactDOM.render(<App />, document.getElementById('root'));

