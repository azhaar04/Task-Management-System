import BoardList from "./board-list/board-list";
import NewList from "./board-list/new-list-form/new-list-form";
import TaskEdit from "./board-list/task-edit/task-edit";

function MainPage({ boards, setBoard, currentBoard, setCurrentBoard, users }) {
    return (
        <div
            class="col-md-9"
            style={{
                border: "1px solid black",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
            }}>
            {currentBoard && (
                <div>
                    <div>
                        <h3
                            style={{
                                textAlign: "center",
                                border: "1px solid black",
                                borderRadius: "5px",
                                padding: "5px",
                                width: "50%",
                                margin: "15px auto",
                            }}>
                            {currentBoard.title}
                        </h3>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                        }}>
                        <BoardList
                            currentBoard={currentBoard}
                            setBoard={setBoard}
                            boards={boards}
                            setCurrentBoard={setCurrentBoard}
                            users={users}
                        />

                        <NewList
                            currentBoard={currentBoard}
                            setCurrentBoard={setCurrentBoard}
                            setBoard={setBoard}
                            boards={boards}
                        />
                    </div>
                </div>
            )}
            {/* <TaskEdit
                selectedTask={selectedTask}
                selectedTaskIndex={selectedTaskIndex}
                setSelectedTask={setSelectedTask}
                setSelectedTaskIndex={setSelectedTaskIndex}
                boards={boards}
                setBoard={setBoard}
                currentBoard={currentBoard}
                selectedListIndex={selectedListIndex}
                setSelectedListIndex={setSelectedListIndex}
                setCurrentBoard={setCurrentBoard}
                users={users}
            /> */}
        </div>
    );
}

export default MainPage;
