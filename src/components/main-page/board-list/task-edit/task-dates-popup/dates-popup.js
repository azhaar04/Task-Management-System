import Calendar from "react-calendar";
import { useSelector, useDispatch } from "react-redux";
import { produce } from "immer";
import { setSelectedTask } from "../../../../../redux/board/board.actions";
import "./dates-popup.css";
import "react-calendar/dist/Calendar.css";

function Dates({ showDates, setShowDates }) {
    const dispatch = useDispatch();

    const selectedTask = useSelector(
        (state) => state.boardReducer.selectedTask
    );

    const dateChange = (date) => {
        if (selectedTask) {
            const updatedSelectedTask = produce(selectedTask, (draft) => {
                draft.dueDate = date;
            });

            dispatch(setSelectedTask(updatedSelectedTask));
        }

        setShowDates(!showDates);
    };

    return (
        <div className="task-dates-popup">
            <div className="task-dates-popup-content">
                <button
                    className="close-window"
                    onClick={() => setShowDates(!showDates)}>
                    X
                </button>
                <Calendar value={selectedTask.dueDate} onChange={dateChange} />
            </div>
        </div>
    );
}

export default Dates;
