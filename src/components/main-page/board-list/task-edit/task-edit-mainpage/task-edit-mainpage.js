import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTask } from "../../../../../redux/board/board.actions";
import { produce } from "immer";
import "./task-edit-mainpage.css";

function TaskEditMainPage({ showCheckListItem, setShowCheckListItem }) {
    const dispatch = useDispatch();
    const selectedTask = useSelector(
        (state) => state.boardReducer.selectedTask
    );
    const [showDescription, setShowDescription] = useState(false);

    useEffect(() => {
        if (selectedTask.description) setShowDescription(!showDescription);
    }, []);

    const handleEditDescription = () => {
        setShowDescription(!showDescription);
        setTimeout(() => {
            const descriptionField = document.getElementById("description");
            if (descriptionField) {
                descriptionField.focus();
                descriptionField.setSelectionRange(
                    descriptionField.value.length,
                    descriptionField.value.length
                );
            }
        }, 10);
    };

    const handleDescriptionChange = (e) => {
        const newDescription = e.target.value;
        const newSelectedTask = produce(selectedTask, (draft) => {
            draft.description = newDescription;
        });
        dispatch(setSelectedTask(newSelectedTask));
    };

    return (
        <div className="task-edit-mainpage col-md-8">
            <div>
                {selectedTask.dueDate && (
                    <div className="due-date">
                        <div className="label-info">
                            <i class="bi bi-calendar-check"></i>
                            <label>Due Date</label>
                        </div>
                        <h6>
                            {new Date(selectedTask.dueDate).getDate()}/
                            {new Date(selectedTask.dueDate).getMonth() + 1}/
                            {new Date(selectedTask.dueDate).getFullYear()}
                        </h6>
                    </div>
                )}
            </div>

            <div>
                {selectedTask.members && (
                    <div className="members">
                        <div className="label-info">
                            <i class="bi bi-person"></i>
                            <label>Members</label>
                        </div>

                        <div className="members-list">
                            {selectedTask.members.map((member) => {
                                const words = member.name.split(" ");
                                const initials = words
                                    .map((word) => word.charAt(0).toUpperCase())
                                    .join("");
                                return (
                                    <div className="member-icon">
                                        {initials}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            <div className="description">
                <div className="description-header">
                    <div className="label-info">
                        <i class="bi bi-justify-left"></i>
                        <label>Description</label>
                    </div>

                    <div className="edit-icon">
                        {selectedTask.description && showDescription && (
                            <i
                                className="bi bi-pencil-square"
                                onClick={handleEditDescription}></i>
                        )}
                    </div>
                </div>
                {selectedTask.description && showDescription ? (
                    <div className="description-content">
                        <p>{selectedTask.description}</p>
                    </div>
                ) : (
                    <div className="description-input">
                        <input
                            type="text"
                            id="description"
                            value={selectedTask.description}
                            onChange={handleDescriptionChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter")
                                    setShowDescription(!showDescription);
                            }}
                        />
                    </div>
                )}
            </div>

            <div className="checklists">
                {selectedTask.checkLists &&
                    selectedTask.checkLists.map((checkList, checkListIndex) => {
                        const checkedItemCount = checkList.checkListItem
                            ? checkList.checkListItem.filter(
                                  (item) => item.checked
                              ).length
                            : 0;

                        const rangeValue = checkList.checkListItem
                            ? Math.floor(
                                  checkedItemCount *
                                      (100 / checkList.checkListItem.length)
                              )
                            : 0;
                        return (
                            <div className="checklist">
                                <div className="checklist-header">
                                    <div className="label-info">
                                        <i class="bi bi-check2-square"></i>
                                        <label>
                                            {checkList.checkListTitle}
                                        </label>
                                    </div>

                                    <i className="bi bi-x-square"></i>
                                </div>

                                <div className="progress-bar">
                                    <span>{rangeValue}%</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={rangeValue}
                                    />
                                </div>

                                <div className="checklist-items">
                                    {checkList.checkListItem &&
                                        checkList.checkListItem.map(
                                            (item, itemIndex) => {
                                                return (
                                                    <div className="checklist-item">
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                item.checked
                                                            }
                                                            onChange={() => {
                                                                const updatedSelectedTask =
                                                                    produce(
                                                                        selectedTask,
                                                                        (
                                                                            draft
                                                                        ) => {
                                                                            const updatedCheckList =
                                                                                {
                                                                                    ...draft
                                                                                        .checkLists[
                                                                                        checkListIndex
                                                                                    ],
                                                                                };
                                                                            updatedCheckList.checkListItem =
                                                                                updatedCheckList.checkListItem.map(
                                                                                    (
                                                                                        item,
                                                                                        index
                                                                                    ) => {
                                                                                        if (
                                                                                            index ===
                                                                                            itemIndex
                                                                                        ) {
                                                                                            return {
                                                                                                ...item,
                                                                                                checked:
                                                                                                    !item.checked,
                                                                                            };
                                                                                        }
                                                                                        return item;
                                                                                    }
                                                                                );

                                                                            draft.checkLists[
                                                                                checkListIndex
                                                                            ] =
                                                                                updatedCheckList;
                                                                        }
                                                                    );

                                                                dispatch(
                                                                    setSelectedTask(
                                                                        updatedSelectedTask
                                                                    )
                                                                );
                                                            }}
                                                        />
                                                        <label>
                                                            {item.checkItem}
                                                        </label>
                                                    </div>
                                                );
                                            }
                                        )}
                                </div>

                                {showCheckListItem && (
                                    <input
                                        type="text"
                                        className="form-control input-add-an-item"
                                        placeholder="Add an item"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                const updatedSelectedTask =
                                                    produce(
                                                        selectedTask,
                                                        (draft) => {
                                                            const updatedCheckList =
                                                                {
                                                                    ...draft
                                                                        .checkLists[
                                                                        checkListIndex
                                                                    ],
                                                                };
                                                            if (
                                                                updatedCheckList.checkListItem
                                                            ) {
                                                                updatedCheckList.checkListItem =
                                                                    [
                                                                        ...updatedCheckList.checkListItem,
                                                                        {
                                                                            checkItem:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            checked: false,
                                                                        },
                                                                    ];
                                                            } else {
                                                                updatedCheckList.checkListItem =
                                                                    [
                                                                        {
                                                                            checkItem:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            checked: false,
                                                                        },
                                                                    ];
                                                            }
                                                            draft.checkLists[
                                                                checkListIndex
                                                            ] =
                                                                updatedCheckList;
                                                        }
                                                    );

                                                dispatch(
                                                    setSelectedTask(
                                                        updatedSelectedTask
                                                    )
                                                );

                                                setShowCheckListItem(
                                                    !showCheckListItem
                                                );
                                            }
                                        }}
                                    />
                                )}

                                <button
                                    className="btn-save btn-add-an-item"
                                    onClick={() =>
                                        setShowCheckListItem(!showCheckListItem)
                                    }>
                                    Add an item
                                </button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default TaskEditMainPage;
