import React from 'react';
import '../App.css';


const style = {
  fontFamily: 'Data Control',
  background: '#CDCDCD',
  fontSize: '30px',
  fontWeight: '800',
  cursor: 'pointer',
  outline: 'none'
};

const Square = ({value, onClick}) => (
<button style={style} onClick={onClick}>
  {value}
</button>
);

export default Square;
