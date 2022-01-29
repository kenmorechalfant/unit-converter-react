import React, { useState, useEffect, useRef, Ref } from 'react';
import UnitType from './types/UnitType';
import CategoryType from './types/UnitCategory';

import './App.css';
import Header from './components/Header';
import Button from './components/Button';
import UnitSelectorButton from './components/UnitSelectorButton';
import Colophon from './components/Colophon';

import { MdBackspace as IconDelete } from 'react-icons/md';
import { MdSwapVert as IconSwap } from 'react-icons/md';

import convert from 'convert-units';
import round from 'lodash/round';

export default function App() {
  const [inValue, inValueSet] = useState<string>('50');
  const [inType, inTypeSet] = useState<UnitType>('kg');
  const [outType, outTypeSet] = useState<UnitType>('lb');
  const [category, categorySet] = useState<CategoryType>(CategoryType.Mass);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => inputRef.current?.focus(), []);

  let outValue: string = convert(Number(inValue)).from(inType).to(outType).toString();

  function handleInValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    inValueSet(e.target.value);
  }

  function allClear() {
    inValueSet('');
  }

  function backspace() {
    inValueSet(inValue.slice(0, -1));
  }

  function ins(s: string) {
    inValueSet(inValue + s);
  }

  function swapUnitTypes(): void {
    inTypeSet(outType);
    outTypeSet(inType);
  }

  function formatValue(value: string): string {
    let num = Number(value);
    
    return round(num, 2).toString();
  }

  return (
    <div className="App">
      <Header />
      <form autoComplete="off" onSubmit={e => e.preventDefault()} className="UnitConverter">
        <div className="UnitConverter__Display">
          <input aria-label="input value" className="UnitConverter__Input" type="text" name="inValue" id="inValue" value={inValue} onChange={handleInValueChange} ref={inputRef} />
          <UnitSelectorButton aria-label="change input unit type" name="inType" value={inType} category={category} onTypeChange={inTypeSet}>{inType}</UnitSelectorButton>

          <input aria-label="output value" className="UnitConverter__Input" type="text" name="outValue" id="outValue" value={formatValue(outValue)} readOnly />
          <UnitSelectorButton name="outType" aria-label="change output unit type" value={outType} category={category} onTypeChange={outTypeSet}>{outType}</UnitSelectorButton>
        </div>

        <div className="UnitConverter__Numpad">
          <Button name="7" onClick={() => ins('7')}>7</Button>
          <Button name="8" onClick={() => ins('8')}>8</Button>
          <Button name="9" onClick={() => ins('9')}>9</Button>
          <Button name="4" onClick={() => ins('4')}>4</Button>
          <Button name="5" onClick={() => ins('5')}>5</Button>
          <Button name="6" onClick={() => ins('6')}>6</Button>
          <Button name="1" onClick={() => ins('1')}>1</Button>
          <Button name="2" onClick={() => ins('2')}>2</Button>
          <Button name="3" onClick={() => ins('3')}>3</Button>
          <Button name="0" onClick={() => ins('0')}>0</Button>
          <Button name="period" onClick={() => ins('.')}>.</Button>

          <Button aria-label="swap unit types" name="unitTypeSwap" onClick={swapUnitTypes}><IconSwap /></Button>
          <Button name="clear" onClick={allClear}>AC</Button>
          <Button name="backspace" onClick={backspace}><IconDelete /></Button>
        </div>
      </form>
      <Colophon />
    </div>
  );
}
