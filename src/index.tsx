import {
  TransitionEventHandler,
  ComponentClass,
  FunctionComponent,
  ReactElement,
  TransitionEvent,
  useState,
  useMemo,
  useRef,
  useEffect,
  createElement,
  forwardRef,
} from './imports/react';

export type ShowOfState = 'enter' | 'exit' | 'idle';

export type ShowOfComponentProps<P> = P & {
  when: boolean;
  state: ShowOfState;
  onTransitionEnd?: TransitionEventHandler<any>;
};

type ShowOfComponent<P> =
  | ComponentClass<ShowOfComponentProps<P>>
  | FunctionComponent<ShowOfComponentProps<P>>;

export interface ShowOfProps<P> {
  when: boolean;
  duration?: number;
  noAppear?: boolean;
  noKeepProps?: boolean;
  render: ShowOfComponent<P>;
}

function ShowOfInner<P extends {}, R extends any>(
  props: ShowOfProps<P> & P,
  ref: R
): ReactElement | null {
  const [state, update] = useState<ShowOfState>(props.noAppear ? 'enter' : 'idle');

  const lastWhen = useRef(props.when);
  // Keep last positive props, to pass as render
  // User props might be already null when we are unmounting the component
  const lastInProps = useRef<ShowOfProps<P> & P>(props);
  if (props.when) lastInProps.current = props;

  // @ts-ignore
  const onTransitionEnd = useMemo(() => {
    if (!props.duration)
      return (e: TransitionEvent<any>) =>
        !lastWhen.current && e.currentTarget === e.target && update('idle');
  }, [props.duration]);

  useEffect(() => {
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

  const nprops = Object.assign({}, props.noKeepProps ? props : lastInProps.current, {
    state,
    onTransitionEnd,
    ref,
  });
  delete nprops.noAppear;
  delete nprops.noKeepProps;
  delete nprops.duration;
  delete nprops.render;

  return createElement(props.render, nprops as any);
}

export const ShowOf: typeof ShowOfInner = forwardRef(ShowOfInner) as any;
