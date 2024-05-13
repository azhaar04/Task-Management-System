import { useState } from "react";

function TaskEditMainPage({
    selectedTask,
    setSelectedTask,

    showCheckListItem,
    setShowCheckListItem,
}) {
    const [showDescription, setShowDescription] = useState(false);
    return (
        <div
            className="col-md-8"
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
            }}>
            <div>
                {selectedTask.dueDate && (
                    <div>
                        <label>Due Date</label>
                        <h6>{`${selectedTask.dueDate.getDate()}/${
                            selectedTask.dueDate.getMonth() + 1
                        }/${selectedTask.dueDate.getFullYear()}`}</h6>
                    </div>
                )}
            </div>

            <div>
                {selectedTask.members && (
                    <div>
                        <label>Members</label>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                            }}>
                            {selectedTask.members &&
                                selectedTask.members.map((member) => {
                                    console.log(member);
                                    const words = member.name.split(" ");
                                    const initials = words
                                        .map((word) =>
                                            word.charAt(0).toUpperCase()
                                        )
                                        .join("");
                                    const iconStyle = {
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50%",
                                        backgroundColor: "#007bff", // Example background color
                                        color: "#ffffff", // Example text color
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginRight: "5px", // Adjust as needed
                                        fontSize: "16px", // Adjust font size as needed
                                    };

                                    return (
                                        <div style={iconStyle}>{initials}</div>
                                    );
                                })}
                        </div>
                    </div>
                )}
            </div>

            <div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}>
                    <label>Description</label>
                    <div
                        style={{
                            position: "absolute",
                            right: 0,
                            marginRight: "12px",
                        }}>
                        {showDescription && (
                            <i
                                class="bi bi-pencil-square"
                                onClick={() => {
                                    setShowDescription(!showDescription);
                                    setTimeout(() => {
                                        const descriptionField =
                                            document.getElementById(
                                                "description"
                                            );
                                        if (descriptionField) {
                                            descriptionField.focus();
                                            descriptionField.setSelectionRange(
                                                descriptionField.value.length,
                                                descriptionField.value.length
                                            );
                                        }
                                    }, 10);
                                }}></i>
                        )}
                    </div>
                </div>
                {selectedTask.desciption && showDescription ? (
                    <div
                        style={{
                            padding: "5px",
                            maxWidth: "100%",
                            wordWrap: "break-word", // Allow word wrapping
                        }}>
                        <p
                            style={{
                                margin: 0,
                                maxWidth: "350px",
                                overflowWrap: "break-word",
                                wordBreak: "break-all",
                            }}>
                            {selectedTask.desciption}
                        </p>
                    </div>
                ) : (
                    <div style={{ maxWidth: "100%" }}>
                        <input
                            type="text"
                            id="description"
                            value={selectedTask.desciption}
                            onSubmit={(e) => {}}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setSelectedTask((prevState) => ({
                                        ...prevState,
                                        desciption: e.target.value,
                                    }));
                                    setShowDescription(!showDescription);
                                }
                            }}
                        />
                    </div>
                )}
            </div>

            <div>
                {selectedTask.checkLists &&
                    selectedTask.checkLists.map((checkList, checkListIndex) => {
                        const checkedItemCount = checkList.checkListItem
                            ? checkList.checkListItem.filter(
                                  (item) => item.checked
                              ).length
                            : 0;

                        // Calculate the value for the range input based on the number of checked items
                        const rangeValue = checkList.checkListItem
                            ? checkedItemCount *
                              (100 / checkList.checkListItem.length)
                            : 0;
                        return (
                            <div>
                                <label>{checkList.checkListTitle}</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={rangeValue}
                                    onChange={
                                        (e) => {}
                                        // setRangeValue(
                                        //     parseInt(e.target.value)
                                        // )
                                    }
                                    style={{ width: "100%" }}
                                />

                                <div>
                                    {checkList.checkListItem &&
                                        checkList.checkListItem.map(
                                            (item, itemIndex) => {
                                                return (
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            id="myCheckbox"
                                                            name="myCheckbox"
                                                            checked={
                                                                item.checked
                                                            }
                                                            onChange={() => {
                                                                setSelectedTask(
                                                                    (
                                                                        prevState
                                                                    ) => {
                                                                        const updatedSelectedTask =
                                                                            {
                                                                                ...prevState,
                                                                            };
                                                                        const updatedCheckLists =
                                                                            [
                                                                                ...updatedSelectedTask.checkLists,
                                                                            ];
                                                                        const updatedCheckList =
                                                                            {
                                                                                ...updatedCheckLists[
                                                                                    checkListIndex
                                                                                ],
                                                                            };

                                                                        // Clone the checkListItem array and update the checked value of the specific item
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
                                                                                        }; // Toggle the checked value
                                                                                    }
                                                                                    return item;
                                                                                }
                                                                            );

                                                                        updatedCheckLists[
                                                                            checkListIndex
                                                                        ] =
                                                                            updatedCheckList;
                                                                        updatedSelectedTask.checkLists =
                                                                            updatedCheckLists;

                                                                        return updatedSelectedTask;
                                                                    }
                                                                );
                                                            }}
                                                        />
                                                        <label for="myCheckbox">
                                                            {item.checkItem}
                                                        </label>
                                                    </div>
                                                );
                                            }
                                        )}
                                </div>

                                <div>
                                    {showCheckListItem && (
                                        <input
                                            type="text"
                                            id="item"
                                            name="item"
                                            placeholder="Add an item"
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    setSelectedTask(
                                                        (prevState) => {
                                                            const updatedSelectedTask =
                                                                {
                                                                    ...selectedTask,
                                                                };
                                                            const updatedCheckLists =
                                                                [
                                                                    ...updatedSelectedTask.checkLists,
                                                                ];
                                                            const updatedCheckList =
                                                                {
                                                                    ...updatedCheckLists[
                                                                        checkListIndex
                                                                    ],
                                                                };
                                                            if (
                                                                updatedCheckList.checkListItem
                                                            ) {
                                                                // If checkListItem array already exists, append the new value
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
                                                                // If checkListItem array doesn't exist, create a new array
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

                                                            updatedCheckLists[
                                                                checkListIndex
                                                            ] =
                                                                updatedCheckList;
                                                            updatedSelectedTask.checkLists =
                                                                updatedCheckLists;
                                                            return updatedSelectedTask;
                                                        }
                                                    );
                                                    setShowCheckListItem(
                                                        !showCheckListItem
                                                    );
                                                }
                                            }}
                                        />
                                    )}
                                </div>

                                <button
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
