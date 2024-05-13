function TaskEditList({
    showTaskNameRename,
    setShowTaskNameRename,
    showAddMembersForm,
    setShowAddMembersForm,
    showDates,
    setShowDates,
    showCheckListForm,
    setShowCheckListForm,
}) {
    return (
        <div className="col-md-4">
            <ul
                className="list-group"
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "center",
                    alignItems: "center",
                }}>
                <li
                    className="list-group-item"
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        // alignItems: "center",
                        gap: "5px",
                        justifyContent: "center", // Center content horizontally
                        alignItems: "center", // Center content vertically
                    }}>
                    <i class="bi bi-caret-right"></i>
                    <span
                        onClick={() =>
                            setShowTaskNameRename(!showTaskNameRename)
                        }>
                        Rename
                    </span>
                </li>

                <li
                    className="list-group-item"
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        // alignItems: "center",
                        gap: "5px",
                        justifyContent: "center", // Center content horizontally
                        alignItems: "center", // Center content vertically
                    }}>
                    <i class="bi bi-person"></i>
                    <span
                        onClick={() =>
                            setShowAddMembersForm(!showAddMembersForm)
                        }>
                        Members
                    </span>
                </li>

                <li
                    className="list-group-item"
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        // alignItems: "center",
                        gap: "5px",
                        justifyContent: "center", // Center content horizontally
                        alignItems: "center", // Center content vertically
                    }}>
                    <i class="bi bi-clock"></i>
                    <span
                        onClick={() => {
                            setShowDates(!showDates);
                        }}>
                        Dates
                    </span>
                </li>

                <li
                    className="list-group-item"
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        // alignItems: "center",
                        gap: "5px",
                        justifyContent: "center", // Center content horizontally
                        alignItems: "center", // Center content vertically
                    }}>
                    <i class="bi bi-check2-square"></i>
                    <span
                        onClick={() => {
                            setShowCheckListForm(!showCheckListForm);
                        }}>
                        Checklist
                    </span>
                </li>
            </ul>
        </div>
    );
}

export default TaskEditList;
