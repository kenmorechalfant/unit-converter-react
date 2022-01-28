import { useState, useEffect } from "react";
import tinykeys from "tinykeys";
import UnitType from "../types/UnitType";

export type UnitSelectorButtonProps = React.HTMLAttributes<HTMLElement> & {
  name?: string,
  value: UnitType,
  onTypeChange?: (value: UnitType) => void
}

export default function UnitSelectorButton({value, onClick, onTypeChange, children, ...props}: UnitSelectorButtonProps) {
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