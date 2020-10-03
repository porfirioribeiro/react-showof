import * as React from 'react';
import { Button } from './Button';
import { ShowOf, ShowOfComponentProps } from '../..';

import 'animate.css/animate.css';

type AnimatedProps = {
  in: string;
  out: string;
  children: React.ReactNode;
};

export function Animated(props: ShowOfComponentProps<AnimatedProps>) {
  return (
    <div
      className={`animate__animated animate__faster animate__${
        props.state === 'exit' ? props.out : props.in
      }`}
    >
      {props.children}
    </div>
  );
}

export function AnimatedContent(props: AnimatedProps) {
  const [on, setOn] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setOn(!on)}>
        {props.in} / {props.out}
      </Button>
      <ShowOf when={on} duration={500} render={Animated} {...props} />
    </div>
  );
}
