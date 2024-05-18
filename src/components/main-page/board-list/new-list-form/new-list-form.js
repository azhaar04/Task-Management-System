import { Formik, Form, Field } from "formik";

import { useEffect } from "react";
import {
    setBoard,
    setCurrentBoard,
} from "../../../../redux/board/board.actions";

import { useDispatch, useSelector } from "react-redux";
import "./new-list-form.css";

function NewList() {
    const dispatch = useDispatch();

    const boards = useSelector((state) => state.boardReducer.boards);
    const currentBoard = useSelector(
        (state) => state.boardReducer.currentBoard
    );

    useEffect(() => {
        if (currentBoard) {
            const updatedBoard = boards.map((board) =>
                board.id === currentBoard.id ? currentBoard : board
            );
            dispatch(setBoard(updatedBoard));
        }
    }, [currentBoard]);

    const addNewList = (listTitle) => {
        if (currentBoard) {
            const newList = {
                listTitle: listTitle,
                taskList: [],
            };
            const updatedCurrentBoard = {
                ...currentBoard,
                lists: [...currentBoard.lists, newList],
            };
            dispatch(setCurrentBoard(updatedCurrentBoard));
        }
    };

    return (
        <div className="new-list-container">
            {currentBoard.lists.length < 3 && (
                <Formik
                    initialValues={{
                        listTitle: "",
                    }}
                    onSubmit={(values, { resetForm }) => {
                        addNewList(values.listTitle);
                        resetForm();
                    }}>
                    {(formikprops) => {
                        return (
                            <Form>
                                <div className="form-group form-container">
                                    <Field
                                        type="input"
                                        className="form-control"
                                        id="listTitle"
                                        name="listTitle"
                                        placeholder="Enter list title..."
                                    />
                                    <button type="submit" className="btn-save">
                                        Add List
                                    </button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            )}
        </div>
    );
}

export default NewList;
