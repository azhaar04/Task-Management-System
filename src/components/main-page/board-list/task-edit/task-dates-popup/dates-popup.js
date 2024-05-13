import Calendar from "react-calendar";

function Dates({ showDates, setShowDates, selectedTask, setSelectedTask }) {
    const dateChange = (date) => {
        setSelectedTask((prevState) => ({ ...prevState, dueDate: date }));
        setShowDates(!showDates);
    };

    return (
        <div className="task-edit-popup">
            <div className="task-edit-popup-content">
                <button
                    className="close-button"
                    onClick={() => setShowDates(!showDates)}>
                    X
                </button>
                <Calendar value={selectedTask.date} onChange={dateChange} />
            </div>
        </div>
    );
}

export default Dates;
