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
  const [focusIndex, focusIndexSet] = useState<number>(0);
  const $self = useRef<HTMLButtonElement | null>(null);
  const possibleTypes: string[] = convert().possibilities(category);
  let unsubscribeKeyEvents = useRef<() => void>(() => {});

  /* 
    Manage focus
  */
  useEffect(() => {
    if (isOpen) {
      ($self.current?.querySelector(`[tabindex='0']`) as HTMLElement)?.focus();
    }
  }, [isOpen, focusIndex]);

  /* 
    Subscribe/Unsubscribe key events 
  */
  useEffect(() => {
    if (isOpen) {
      unsubscribeKeyEvents.current = tinykeys(window, {
        "ArrowDown": focusNext,
        "ArrowRight": focusNext,
        "ArrowUp": focusPrev,
        "ArrowLeft": focusPrev,
        "Escape": () => closeDialog()
      });
    } else {
      unsubscribeKeyEvents.current?.();
    }

    return () => {
      unsubscribeKeyEvents.current?.();
    }
  }, [isOpen, focusIndex]);

  function openDialog() {
    isOpenSet(true);
  }

  function closeDialog() {
    focusIndexSet(0);
    $self.current?.focus();
    isOpenSet(false);
  }

  function focusNext(e: KeyboardEvent) {
    e.preventDefault();
    let max = possibleTypes.length;
    focusIndexSet((focusIndex + max + 1) % max);
  }

  function focusPrev(e: KeyboardEvent) {
    e.preventDefault();
    let max = possibleTypes.length;
    focusIndexSet((focusIndex + max - 1) % max);
  }

  function handleClickButton(e: any) {
    onClick?.(e);
    openDialog();
  }

  function handleFocusSelf(e: React.FocusEvent) {
    openDialog();
  }

  function handleBlur(e: React.FocusEvent) {
    if (!$self.current?.contains(e.relatedTarget)) {
      closeDialog();
    }
  }

  return (
    <button
      role="radiogroup"
      ref={$self}
      className={`Button UnitSelectorButton ${isOpen ? 'UnitSelectorButton--open' : ''}`}
      onClick={handleClickButton}
      onFocus={handleFocusSelf}
      tabIndex={ isOpen ? -1 : 0 }
      {...props}
    >
      {children}

      <div className="UnitSelectorButton__Dialog">
        {possibleTypes.map((t, i) => {
          return (
            <div className={`UnitSelectorButton__Dialog__Option ${value === t ? 'UnitSelectorButton__Dialog__Option--selected' : ''}`} key={t}>
              <input
                type="radio"
                tabIndex={ isOpen && (i === focusIndex) ? 0 : -1 }
                id={t}
                name={t}
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