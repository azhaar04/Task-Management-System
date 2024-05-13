import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function SideNavbar({
    setBoard,
    boards,
    currentBoard,
    setShowNewMemberForm,
    setShowMembersTable,
    setCurrentBoard,
}) {
    const [isBoardsVisible, setIsBoardsVisible] = useState(false);
    const [isMembersVisible, setIsMembersVisible] = useState(false);
    const [isCreateBoard, setIsCreateBoard] = useState(false);

    return (
        <div
            class="col-md-3"
            style={{
                border: "1px solid black",
                height: "80vh",
                backgroundColor: "#F2F2F2",
            }}>
            <ul class="list-group mt-3">
                <li class="list-group-item" style={{ marginBottom: "10px" }}>
                    <span
                        onClick={() => {
                            console.log(boards);
                            if (boards) setIsBoardsVisible(!isBoardsVisible);
                        }}>
                        Your Boards
                    </span>
                    <ul class="list-group">
                        {isBoardsVisible &&
                            boards &&
                            boards.map((board, boardIndex) => {
                                return (
                                    <li
                                        className={`list-group-item ${
                                            board.id === currentBoard.id
                                                ? "active"
                                                : ""
                                        }`}
                                        //  className="list-group-item"
                                        onClick={() => {
                                            // getCurrentBoard(board.id);
                                            setCurrentBoard(board);
                                            setShowMembersTable(false);
                                            setShowNewMemberForm(false);
                                        }}>
                                        {board.title}
                                    </li>
                                );
                            })}
                    </ul>
                </li>

                <li class="list-group-item" style={{ marginBottom: "10px" }}>
                    <span onClick={() => setIsCreateBoard(!isCreateBoard)}>
                        Create New Board
                    </span>

                    {isCreateBoard && (
                        <ul
                            style={{
                                width: "270px",
                                padding: "0px",
                                marginTop: "10px",
                            }}>
                            <Formik
                                initialValues={{ boardTitle: "" }}
                                onSubmit={(values, { resetForm }) => {
                                    let updatedBoard;
                                    const uniqueId = uuidv4();
                                    if (boards) {
                                        updatedBoard = [
                                            ...boards,
                                            {
                                                title: values.boardTitle,
                                                id: uniqueId,
                                                lists: [],
                                            },
                                        ];
                                    } else {
                                        updatedBoard = [
                                            {
                                                title: values.boardTitle,
                                                id: uniqueId,
                                                lists: [],
                                            },
                                        ];
                                    }
                                    setBoard(updatedBoard);

                                    setCurrentBoard({
                                        title: values.boardTitle,
                                        id: uniqueId,
                                        lists: [],
                                    });

                                    setIsCreateBoard(false);
                                    setShowMembersTable(false);
                                    setShowNewMemberForm(false);
                                    resetForm();
                                }}>
                                {(formikprops) => {
                                    return (
                                        <Form>
                                            <div className="form-group mb-3 ">
                                                <label
                                                    htmlFor="boardTitle"
                                                    className="form-label">
                                                    Board Title*
                                                </label>
                                                <Field
                                                    type="input"
                                                    className="form-control"
                                                    id="boardTitle"
                                                    name="boardTitle"
                                                />
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </ul>
                    )}
                </li>

                <li class="list-group-item">
                    <span
                        onClick={() => setIsMembersVisible(!isMembersVisible)}>
                        Members
                    </span>
                    {isMembersVisible && (
                        <ul
                            className="list-group"
                            style={{ marginTop: "10px" }}>
                            <li
                                class="list-group-item"
                                onClick={() => {
                                    setShowMembersTable(true);
                                    setShowNewMemberForm(false);
                                }}>
                                Your Members
                            </li>
                            <li
                                class="list-group-item"
                                onClick={() => {
                                    setShowNewMemberForm(true);
                                    setShowMembersTable(false);
                                }}>
                                Add New Member
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
}

export default SideNavbar;
