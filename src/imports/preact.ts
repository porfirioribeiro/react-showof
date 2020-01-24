export { createElement } from 'preact';
export { forwardRef } from 'preact/compat';
export { useState, useRef, useMemo, useEffect } from 'preact/hooks';

// types
export { ComponentClass, FunctionComponent } from 'preact';
import { JSX } from 'preact';
export type ReactElement = JSX.Element;
export type TransitionEventHandler<Target extends EventTarget> = JSX.TransitionEventHandler<Target>;
export type TransitionEvent<Target extends EventTarget> = JSX.TargetedTransitionEvent<Target>;
