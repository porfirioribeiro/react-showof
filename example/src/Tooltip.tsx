import * as React from 'react';
import PopperJS, { Placement } from 'popper.js';

import { ShowOfComponentProps } from '../../';

import './Tooltip.css';

type TooltipProps = ShowOfComponentProps<{
  tooltip: string;
  buttonRef: React.RefObject<HTMLButtonElement>;
  placement?: Placement;
}>;

export function Tooltip({
  state,
  tooltip,
  onTransitionEnd,
  placement = 'auto',
  buttonRef,
}: TooltipProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const popper = new PopperJS(buttonRef.current!, ref.current!, {
      placement: placement,
    });
    return () => popper.destroy();
  }, []);

  return (
    <div ref={ref} className={`tooltip ${state}`} onTransitionEnd={onTransitionEnd}>
      {tooltip}
    </div>
  );
}
