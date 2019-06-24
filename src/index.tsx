import * as React from 'react';

export type ShowOfState = 'enter' | 'exit' | 'idle';

export type ShowOfComponentProps<P> = P & {
  when: boolean;
  state: ShowOfState;
  onTransitionEnd?: React.TransitionEventHandler<any>;
};

type ShowOfComponent<P> =
  | React.ComponentClass<ShowOfComponentProps<P>>
  | React.FunctionComponent<ShowOfComponentProps<P>>;

export interface ShowOfProps<P> {
  when: boolean;
  duration?: number;
  noAppear?: boolean;
  render: ShowOfComponent<P>;
}

function ShowOfInner<P extends {}, R extends any>(
  props: ShowOfProps<P> & P,
  ref: R
): React.ReactElement | null {
  const [state, update] = React.useState<ShowOfState>(props.noAppear ? 'enter' : 'idle');

  const lastWhen = React.useRef(props.when);

  //@ts-ignore
  const onTransitionEnd = React.useMemo(() => {
    if (!props.duration)
      return (e: React.TransitionEvent<any>) =>
        !lastWhen.current && e.currentTarget === e.target && update('idle');
  }, [props.duration]);

  React.useEffect(() => {
    if (props.when !== lastWhen.current || (props.when && !props.noAppear)) {
      requestAnimationFrame(() => update(props.when ? 'enter' : 'exit'));
      lastWhen.current = props.when;
    }
    if (!props.when && props.duration) {
      const ti = setTimeout(update, props.duration, 'idle');
      return () => clearTimeout(ti);
    }
    return;
  }, [props.when, props.duration]);

  if (!props.when && state === 'idle') return null;

  const nprops = Object.assign({ state, onTransitionEnd, ref }, props);
  delete nprops.noAppear;
  delete nprops.duration;
  delete nprops.render;

  return React.createElement(props.render, nprops as any);
}

export const ShowOf: typeof ShowOfInner = React.forwardRef(ShowOfInner) as any;
