import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import { ShowOf } from '../.';
import './test.css';
import { Button } from './src/Button';
import { AnimatedContent } from './src/Animated';

function Test(p: { show: boolean; appear?: boolean }) {
  const [show, setShow] = React.useState(p.show);
  return (
    <div>
      <Button onClick={() => setShow(!show)} tooltip="Toogle the component" tipPlacement="right">
        Toggle {show ? 'off' : 'on'}
      </Button>
      <ShowOf
        when={show}
        appear={p.appear}
        duration={300}
        render={({ state }) => {
          return <div className={`test ${state}`}>Hello {state}</div>;
        }}
      />
    </div>
  );
}

const App = () => {
  return (
    <div>
      <Test show={false}></Test>
      <Test show={true}></Test>
      <Test show={true} appear={false}></Test>
      <Button tooltip="This is just a tip" tipPlacement="bottom-end">
        Hello
      </Button>
      <AnimatedContent in="fadeIn" out="fadeOut">
        Fade
      </AnimatedContent>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
