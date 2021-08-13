import React from 'react';
import Square from './Square';
import '../App.css';

const style = {
  fontFamily: 'Data Control',
  marginTop: '50px',
  backgroundColor: 'black',
  border: '3px solid',
  width: '300px',
  height: '300px',
  margin: '0 auto',
  display: 'grid',
  gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)'
};

const Board = ({ squares, onClick}) => (
<div style={style}>
  {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
  ))}
  </div>
  )

export default Board;
