import "./task-edit-list.css";

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
            <label className="label">Add to card</label>
            <ul className="list-group">
                <li
                    className="list-group-item"
                    onClick={() => setShowTaskNameRename(!showTaskNameRename)}>
                    <i className="bi bi-caret-right"></i>
                    <span>Rename</span>
                </li>

                <li
                    className="list-group-item"
                    onClick={() => setShowAddMembersForm(!showAddMembersForm)}>
                    <i className="bi bi-person"></i>
                    <span>Members</span>
                </li>

                <li
                    className="list-group-item"
                    onClick={() => setShowDates(!showDates)}>
                    <i className="bi bi-clock"></i>
                    <span>Dates</span>
                </li>

                <li
                    className="list-group-item"
                    onClick={() => setShowCheckListForm(!showCheckListForm)}>
                    <i className="bi bi-check2-square"></i>
                    <span>Checklist</span>
                </li>
            </ul>
        </div>
    );
}

export default TaskEditList;
