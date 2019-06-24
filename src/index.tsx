import * as React from 'react';

export type ShowOfState = 'enter' | 'exit' | 'idle';

export type ShowOfComponentProps<P> = P & {
  when: boolean;
  state: ShowOfState;
};

type ShowOfComponent<P> =
  | React.ComponentClass<ShowOfComponentProps<P>>
  | React.FunctionComponent<ShowOfComponentProps<P>>;

export interface ShowOfProps<P> {
  when: boolean;
  duration: number;
  appear?: boolean;
  render: ShowOfComponent<P>;
}

export const ShowOf = React.forwardRef(function ShowOf<P extends {}, R extends any>(
  { render, when, duration, appear = true, ...props }: ShowOfProps<P> & P,
  ref: R
) {
  const [state, update] = React.useState<ShowOfState>(appear ? 'idle' : 'enter');

  const lastWhen = React.useRef(when);

  React.useEffect(() => {
    if (when !== lastWhen.current || (when && appear)) {
      requestAnimationFrame(() => update(when ? 'enter' : 'exit'));
      lastWhen.current = when;
    }
    if (!when) {
      const ti = setTimeout(update, duration, 'idle');
      return () => clearTimeout(ti);
    }
    return;
  }, [when]);

  return when || state !== 'idle'
    ? React.createElement(render, Object.assign({ when, state, ref }, props) as any)
    : null;
});
