import React, { useState, useEffect, useRef, Ref } from 'react';
import './App.css';
import Header from './components/Header';
import Colophon from './components/Colophon';

import { MdBackspace as IconDelete } from 'react-icons/md';
import { MdSwapVert as IconSwap } from 'react-icons/md';

import convert, { Mass } from 'convert-units';
import round from 'lodash/round';
import tinykeys from 'tinykeys';

type UnitType = Mass;

enum Category {
  Weight = 0,
  Length = 1,
  Temperature = 2
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button(props: ButtonProps) {
  return <button className="Button" {...props}></button>
}

type UnitSelectorButtonProps = React.HTMLAttributes<HTMLElement> & {
  name?: string,
  value: UnitType,
  onTypeChange?: (value: UnitType) => void
}

function UnitSelectorButton({value, onClick, onTypeChange, children, ...props}: UnitSelectorButtonProps) {
  const [isOpen, isOpenSet] = useState<boolean>(false);
  // TODO:
  // const [hasFocus, hasFocusSet] = useState<boolean>(false);

  // props.value: string (e.g.: mg, g, kg, lbs, etc)
    // set via a radio button (styled to just look like a label/button)

  useEffect(() => {
    /* 
      subscribe to key events: spacebar, enter, esc, etc
        maybe write my own interface/provider over my input code and/or whatever lib i use
    */
     
    let unsubscribe = tinykeys(window, {
      "Space": () => {
        openDialog();
      },
      "Enter": () => {
        openDialog();
      },
      "Escape": () => {
        closeDialog();
      }
    });

    // TODO: 
  
    // when activated by keypress:
    
      // [?] Maybe a good idea to memoize the function based on a 'isFocused' state variable
      //     You don't have to be focused to click it though

    // when activated by click:
    //   open()

    // open():
    //   disable tabindex on self
    //   enable tabindex on the dialog's inputs
    //   focus the first input element in the dialog

    // when 'esc' || lose focus:
    //   update focus state

    return () => {
      unsubscribe();
    }
  });

  function openDialog() {
    // TODO: 
    //   first check if we are focused:
    //     open
      // alert("openDialog");
  }

  function closeDialog() {
    // TODO: 
      // alert("closeDialog");
  }

  function handleClick(e: any) {
    onClick?.(e);

    // TODO:
    // alert('clicked');
} 

  function handleFocus() {
    isOpenSet(true);
  }

  function handleBlur() {
    isOpenSet(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    isOpenSet(false);
  }


  return (
    <button 
      className="Button" 
      onClick={handleClick} 
      onFocus={handleFocus} 
      onBlur={handleBlur} 
      onKeyDown={handleKeyDown} 
      {...props}
    >
      {children}

      <div className={isOpen ? 'open' : ''}>
        <input type="radio" id="mg" name="mg" value="mg" checked={value === 'mg'} onClick={() => onTypeChange?.('mg')} />
        <label htmlFor="mg">mg</label>

        <input type="radio" id="g" name="g" value="g" checked={value === 'g'} onClick={() => onTypeChange?.('g')} />
        <label htmlFor="g">g</label>

        <input type="radio" id="kg" name="kg" value="kg" checked={value === 'kg'} onClick={() => onTypeChange?.('kg')} />
        <label htmlFor="kg">kg</label>

        <input type="radio" id="lb" name="lb" value="lb" checked={value === 'lb'} onClick={() => onTypeChange?.('lb')} />
        <label htmlFor="lb">lb</label>
      </div>
    </button>
  );
}

export default function App() {
  const [inValue, inValueSet] = useState<string>('50');
  const [inType, inTypeSet] = useState<UnitType>('kg');
  const [outType, outTypeSet] = useState<UnitType>('lb');
  const [category, categorySet] = useState<Category>(Category.Weight);
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
    let oldInType = inType;
    inTypeSet(outType);
    outTypeSet(oldInType);
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
          <UnitSelectorButton aria-label="change input unit type" name="inType" value={inType} onTypeChange={inTypeSet}>{inType}</UnitSelectorButton>

          <input aria-label="output value" className="UnitConverter__Input" type="text" name="outValue" id="outValue" value={formatValue(outValue)} readOnly />
          <UnitSelectorButton name="outType" aria-label="change output unit type" value={outType} onTypeChange={outTypeSet}>{outType}</UnitSelectorButton>
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
