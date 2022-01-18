import React, { ChangeEvent, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Colophon from './components/Colophon';

enum Category {
  Weight = 0,
  Length = 1,
  Temperature = 2
}

interface ButtonProps {
  children?: React.ReactNode,
  name?: string
}

function Button({children, name}: ButtonProps) {
  return <button className="Button" name={name}>{children}</button>
}

export default function App() {
  const [inValue, inValueSet] = useState<number>(50);
  const [inType, inTypeSet] = useState<string>('kg');
  const [outType, outTypeSet] = useState<string>('lb');
  const [category, categorySet] = useState<Category>(Category.Weight);

  let outValue = inValue * 2; // #TODO unit conversion

  function handleInValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    inValueSet(Number(e.target.value));
  }

  return (
    <div className="App">
      <Header />
      <form onSubmit={e => e.preventDefault()} className="UnitConverter">
        <div className="UnitConverter__Display">
          <input className="UnitConverter__Input" type="text" name="inValue" id="inValue" value={inValue} onChange={handleInValueChange} />
          <Button name="inType">{inType}</Button>

          <input className="UnitConverter__Input" type="text" name="outValue" id="outValue" value={outValue} readOnly />
          <Button name="outType">{outType}</Button>

          <Button name="unitTypeSwap"><span style={{fontSize: ".8rem"}}>SW</span></Button>
        </div>

        <div className="UnitConverter__Numpad">
          <Button name="clear">CLR</Button>
          <Button name="backspace">DEL</Button>

          <Button name="9">9</Button>
          <Button name="8">8</Button>
          <Button name="7">7</Button>
          <Button name="6">6</Button>
          <Button name="5">5</Button>
          <Button name="4">4</Button>
          <Button name="3">3</Button>
          <Button name="2">2</Button>
          <Button name="1">1</Button>
          <Button name="0">0</Button>
          <Button name="period">.</Button>
        </div>
      </form>
    </div>
  );

  // return (
  //   <div className="App">
  //     <Header />
  //     <CategorySelector category={category} categorySet={categorySet} />
      
      
  //     <div className="IO">
  //       <label htmlFor="ValueInput">Input</label>
  //       <input id="ValueInput" className="IO__Input" type="number" value={inValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inValueSet(Number(e.target.value))}/>
        
  //       <label htmlFor="ValueOutput">Output</label>
  //       <input id="ValueOutput" className="IO__Input" type="number" value={outValue} readOnly/>
  //     </div>

  //     <Numpad />
  //     <Colophon />
  //   </div>
  // );
}
