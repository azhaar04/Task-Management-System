import { Formik, Form, Field } from "formik";

import { useEffect } from "react";

function NewList({ boards, currentBoard, setCurrentBoard, setBoard }) {
    useEffect(() => {
        const updatedBoard = [...boards];
        updatedBoard[currentBoard.id] = { ...currentBoard };
        setBoard(updatedBoard);
    }, [currentBoard]);

    return (
        <div
            style={{
                marginTop: "30px",
                marginLeft: "10px",
            }}>
            {currentBoard.lists.length < 3 && (
                <Formik
                    initialValues={{
                        listTitle: "",
                    }}
                    onSubmit={(values, { resetForm }) => {
                        const newObj = {
                            listTitle: values.listTitle,
                            taskList: [],
                        };

                        const updatedCurrentBoard = { ...currentBoard };
                        updatedCurrentBoard.lists.push(newObj);
                        setCurrentBoard(updatedCurrentBoard);

                        console.log(boards);

                        resetForm();
                    }}>
                    {(formikprops) => {
                        return (
                            <Form>
                                <div
                                    className="form-group mb-3 "
                                    style={{
                                        width: "300px",
                                        border: "1px solid black",
                                        borderRadius: "5px",
                                        padding: "10px",
                                    }}>
                                    <Field
                                        type="input"
                                        className="form-control"
                                        id="listTitle"
                                        name="listTitle"
                                        placeholder="Enter list title..."
                                        style={{
                                            width: "70%",
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        style={{
                                            width: "30%",
                                            marginTop: "5px",
                                        }}
                                        className="btn btn-primary">
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
