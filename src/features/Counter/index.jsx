import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

function CounterFeature(props) {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.count);

    const handleIncrease = () => {
        const action = increase(); // action creator
        dispatch(action);
    };

    const handleDecrease = () => {
        const action = decrease(); // action creator
        dispatch(action);
    };

    return (
        <div>
            Counter: {count}
            <div>
                <button onClick={handleIncrease}>Increase</button>
                <button onClick={handleDecrease}>Decrease</button>
            </div>
        </div>
    );
}

export default CounterFeature;
