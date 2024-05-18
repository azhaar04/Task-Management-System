import BoardList from "./board-list/board-list";
import NewList from "./board-list/new-list-form/new-list-form";

import { useSelector } from "react-redux";
import "./mainpage.css";

function MainPage() {
    const currentBoard = useSelector(
        (state) => state.boardReducer.currentBoard
    );

    return (
        <div className="mainpage-container col-md-9">
            {currentBoard && (
                <div>
                    <div>
                        <h3 className="mainpage-title">{currentBoard.title}</h3>
                    </div>
                    <div className="mainpage-content">
                        <BoardList />
                        <NewList />
                    </div>
                </div>
            )}
        </div>
    );
}

export default MainPage;
