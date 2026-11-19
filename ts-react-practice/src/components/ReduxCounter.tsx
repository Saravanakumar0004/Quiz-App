import { useAppDispatch, useAppSelector } from "../store/hooks";
import { increment, decrement, incrementBy } from "../store/counterSlice";

function ReduxCounter() {
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <p>Redux count: {value}</p>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementBy(5))}>+5</button>
    </div>
  );
}

export default ReduxCounter;