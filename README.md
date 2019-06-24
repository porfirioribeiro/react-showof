# react-showof

React-showof is a small (less than 500b) and opiniated component to help with (un)mounting transitions.

## Problem

Many times in my workflow i just need to show a litle animation when showing and hidding a component.

Css transitions are good for animations based on state change, but the problem is that
you might not want to have your component mounted because it may be heavy and the user
may not even do the action to show it ever, so its a waste of rendering and DOM nodes.

If you conditionaly mount and apply the transitions it wont work, because you need to
have a previous state to transition from.

## Solution

Mount your component with a `idle` state that will represent your initial styles like:

```css
.my-component.idle {
  opacity: 0;
}
```

Then change it right away to the `enter` state:

```css
.my-component.enter {
  transition: opacity 300ms linear;
  opacity: 1;
}
```

Now, how do you manage this state change, and what to do for unmount?

The solution could to use `CSSTransition` from [react-transition-group](http://reactcommunity.org/react-transition-group/css-transition) to managed that state changes.

I find it to litle bit over complicated and to have too many states that ends up being hard to understand what to use when.

## ShowOf

ShowOf takes care of mounting and unmounting your component and pass the current state of
the animation.

```tsx
<ShowOff
  when={shouldShow}
  duration={timeToUnmount}
  noAppear={avoidAnimateOnMount}
  render={componentToRender}
/>
```

- `when`: boolean, do we ant to show or not our component
- `duration`: number, how many time do we want to wait until our component unmounts after setting when to false
- `noAppear`: if we initially mount with `when=true`, do we want to animate the appearence of it?
- `render`: Component or function to render
- `...props`: the rest of the props passed to `ShowOf` will be passed to the `render` component or function

`render` component/function receives as props:

- `when` prop
- `state` the current `State`
- `onTransitionEnd` to assing to the inner dom component so we can unmount after the animation run
- `...props` plus the rest of the props.

**Note** `onTransitionEnd` is only passed when you don't specify `duration`

`State` is composed by 3 states `idle`, `enter`, `exit`:

- `idle` when the component is mounted, its the begin style where you want to animate `from` when mounting.
- `enter` just after rendering `idle` state, it is changed to this state, where you set the `to` styes and transitions you want to apply
- `exit` is where `when` becames false and we start unmounting the component, where you set the to styles for the unmount transition animation

### Example

```css
/* component style */
.test {
  border: 1px solid gray;
}

/* 
 common styles for idle and exit as we use the same transitions 
 for enter and exit
 */
.test.idle,
.test.exit {
  opacity: 0;
  width: 20%;
}

/* styles to apply on enter state */
.test.enter {
  transition: opacity 300ms linear, width 300ms ease-in;
  opacity: 1;
  width: 100%;
}

/* styles to apply on exit state */
.test.exit {
  transition: opacity 300ms linear, width 300ms ease-out;
}
```

```js
function Test() {
  const [show, setShow] = React.useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle {show ? 'off' : 'on'}</button>
      <ShowOf
        when={show}
        duration={300}
        render={({ state }) => {
          return <div className={`test ${state}`}>Hello {state}</div>;
        }}
      />
    </div>
  );
}
```

## Todo

- Docs
- Examples
- Tests
