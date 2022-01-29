import './UnitSelectorButton.css';
import React, { useState, useEffect, useRef } from "react";
import tinykeys from "tinykeys";
import convert from 'convert-units';
import UnitType from "../types/UnitType";

export type UnitSelectorButtonProps = React.HTMLAttributes<HTMLElement> & {
  name?: string,
  value: UnitType,
  category: 'mass' | 'length' | 'temperature',
  onTypeChange?: (value: UnitType) => void
}

export default function UnitSelectorButton({value, category, onClick, onTypeChange, children, ...props}: UnitSelectorButtonProps) {
  const [isOpen, isOpenSet] = useState<boolean>(false);
  const [focusState, focusStateSet] = useState<null | 'self' | 'within'>(null);
  const $self = useRef<HTMLButtonElement | null>(null);
  const possibleTypes: string[] = convert().possibilities(category);

  /* 
    Focus the current radio button when the dialog opens. 
  */
  useEffect(() => {
    if (isOpen) {
      ($self.current?.querySelector(`[name="${value}"]`) as HTMLElement)?.focus(); 
    }
  }, [isOpen]);

  /* 
    Subscribe/Unsubscribe key events 
  */
  useEffect(() => {
    let unsubscribe = tinykeys(window, {
      "Space": () => {
        if (focusState === 'self') openDialog();
      },
      "Enter": () => {
        if (focusState === 'self') openDialog();
      },
      "Escape": () => closeDialog()
    });

    return () => {
      unsubscribe();
    }
  });

  function openDialog() {
    isOpenSet(true);
  }

  function closeDialog() {
    if (focusState === 'within') {
      $self.current?.focus();
      isOpenSet(false);
    }
  }

  function handleClickButton(e: any) {
    onClick?.(e);
    openDialog();
  }

  function handleFocus(e: React.FocusEvent) {
    // Note: a node contains() itself so we explicitly check for just self first
    if (e.target === $self.current) {
      focusStateSet('self');
      closeDialog();
    } else if ($self.current?.contains(e.target)) {
      focusStateSet('within');
    }
  }

  function handleBlur(e: React.FocusEvent) {
    if (!$self.current?.contains(e.relatedTarget)) {
      focusStateSet(null);
      closeDialog();
    }
  }

  return (
    <button
      ref={$self}
      className={`Button UnitSelectorButton ${isOpen ? 'UnitSelectorButton--open' : ''}`}
      onClick={handleClickButton}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    >
      {children}

      <div className="UnitSelectorButton__Dialog">
        {possibleTypes.map((t, i) => {
          return (
            <div className={`UnitSelectorButton__Dialog__Option ${value === t ? 'UnitSelectorButton__Dialog__Option--selected' : ''}`} key={t}>
              <input
                type="radio"
                tabIndex={ isOpen ? 0 : -1 }
                id={t}
                name={t}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={t}
                checked={value === t}
                onChange={() => {
                  onTypeChange?.(t as UnitType);
                  closeDialog();
                }} />
              <label htmlFor={t}>{t}</label>
            </div>
          );
        })}
      </div>
    </button>
  );
}