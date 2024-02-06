import React, { Dispatch, createContext, useContext, useReducer } from 'react';

const initialState = {
  count: 0,
}

type CounterState = {
  count: number
}

type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }

interface CounterContextType {
  state: CounterState;
  dispatch: Dispatch<CounterAction>;

}
const CounterContext = createContext<CounterContextType | undefined>(undefined);

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
}

interface CounterProviderProps {
  children: React.ReactNode
}

const CounterProvider = ({ children }: CounterProviderProps) => {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  const value = { state, dispatch };

  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  )
}

const Counter: React.FunctionComponent = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('counter must be used within a CounterProvider');
  }
  const { state, dispatch } = context;

  return (
    <div>
      count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  )
}

const ContextWithReducer: React.FC = () => (
  <CounterProvider>
    <Counter />
  </CounterProvider>
)
export default ContextWithReducer;
