import TableHeader from "./table-header/table.header";
import TableBody from "./table-body/table.body";

function MembersTable({ users }) {
    const columns = [
        {
            label: "ID",
            path: "id",
            content: (item, path, index) => <td>{index + 1}</td>,
        },
        {
            label: "Name",
            path: "name",
            content: (item, path, index) => <td>{item[path]}</td>,
        },
        {
            label: "Email",
            path: "email",
            content: (item, path, index) => <td>{item[path]}</td>,
        },
    ];
    return (
        <div
            class="col-md-9"
            style={{
                border: "1px solid black",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
            <h3>Members</h3>
            <table class="table" style={{ marginTop: "10px" }}>
                <TableHeader columns={columns} />
                <TableBody items={users} columns={columns} />
            </table>
        </div>
    );
}

export default MembersTable;
