import { Placement } from 'popper.js';
import * as React from 'react';
import { ShowOf } from '../..';
import { Tooltip } from './Tooltip';

import './Button.css';

type ButtonProps = {
  tooltip?: string;
  children: React.ReactNode;
  tipPlacement?: Placement;
} & React.HTMLProps<HTMLButtonElement>;

export function Button({ tooltip, tipPlacement, children, ...props }: ButtonProps) {
  const [showTip, setTipShow] = React.useState(false);

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        ref={buttonRef}
        className="button"
        onMouseEnter={() => setTipShow(true)}
        onMouseLeave={() => setTipShow(false)}
        {...(props as any)}
      >
        {children}
      </button>
      {tooltip && (
        <ShowOf
          when={showTip}
          render={Tooltip}
          tooltip={tooltip}
          buttonRef={buttonRef}
          placement={tipPlacement}
        />
      )}
    </>
  );
}
