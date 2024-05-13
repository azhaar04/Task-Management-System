import TopNavbar from "../../components/top-navbar/top.navbar";
import SideNavbar from "../../components/side-navbar/side.navbar";
import MainPage from "../../components/main-page/mainpage";
import AddMemberForm from "../../components/add-member-form/add-member-form";
import MembersTable from "../../components/memers-table/members-table";

import { useState, useEffect } from "react";

function Homepage() {
    const [boards, setBoard] = useState();

    let [currentBoard, setCurrentBoard] = useState();
    const [showNewMemberForm, setShowNewMemberForm] = useState(false);
    const [showMembersTable, setShowMembersTable] = useState(false);
    const [users, setUsers] = useState();

    useEffect(() => {
        if (boards) {
            localStorage.setItem("myBoard", JSON.stringify(boards));
            localStorage.setItem("currentBoard", JSON.stringify(currentBoard));
        }
    }, [boards]);

    useEffect(() => {
        if (users) {
            localStorage.setItem("user", JSON.stringify(users));
        }
    }, [users]);

    useEffect(() => {
        // Retrieve boards from local storage
        const storedBoards = localStorage.getItem("myBoard");
        const storedCurrentBoard = localStorage.getItem("currentBoard");

        if (storedBoards !== null) {
            try {
                setBoard(JSON.parse(storedBoards));
                setCurrentBoard(JSON.parse(storedCurrentBoard));
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        }
    }, []);

    useEffect(() => {
        const storedUsers = localStorage.getItem("user");
        if (storedUsers !== null) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);

    return (
        <div>
            <div>
                <TopNavbar />
            </div>

            <div class="container">
                <div
                    class="row"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "10px",
                    }}>
                    <SideNavbar
                        setBoard={setBoard}
                        boards={boards}
                        currentBoard={currentBoard}
                        setShowNewMemberForm={setShowNewMemberForm}
                        setShowMembersTable={setShowMembersTable}
                        setCurrentBoard={setCurrentBoard}
                    />

                    {showNewMemberForm ? (
                        <AddMemberForm
                            setShowNewMemberForm={setShowNewMemberForm}
                            users={users}
                            setUsers={setUsers}
                        />
                    ) : showMembersTable ? (
                        <MembersTable users={users} />
                    ) : (
                        <MainPage
                            setBoard={setBoard}
                            boards={boards}
                            currentBoard={currentBoard}
                            setCurrentBoard={setCurrentBoard}
                            users={users}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Homepage;
