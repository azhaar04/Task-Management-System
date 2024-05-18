import TopNavbar from "../../components/top-navbar/top.navbar";
import SideNavbar from "../../components/side-navbar/side.navbar";
import MainPage from "../../components/main-page/mainpage";
import AddMemberForm from "../../components/add-member-form/add-member-form";
import MembersTable from "../../components/memers-table/members-table";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setUsers, setIsLoggedIn } from "../../redux/user/user.actions";
import { setBoard, setCurrentBoard } from "../../redux/board/board.actions";
import "./homepage.css";

function Homepage() {
    const dispatch = useDispatch();

    const [showNewMemberForm, setShowNewMemberForm] = useState(false);
    const [showMembersTable, setShowMembersTable] = useState(false);

    const boards = useSelector((state) => state.boardReducer.boards);
    const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
    const users = useSelector((state) => state.userReducer.users);
    const currentBoard = useSelector(
        (state) => state.boardReducer.currentBoard
    );

    useEffect(() => {
        if (boards.length > 0) {
            localStorage.setItem("myBoard", JSON.stringify(boards));
            localStorage.setItem("currentBoard", JSON.stringify(currentBoard));
        }
    }, [boards]);

    useEffect(() => {
        if (users.length > 0) {
            localStorage.setItem("user", JSON.stringify(users));
        }
    }, [users]);

    useEffect(() => {
        localStorage.setItem("userLoggedIn", JSON.stringify(isLoggedIn));
    });

    useEffect(() => {
        const storedBoards = localStorage.getItem("myBoard");
        const storedCurrentBoard = localStorage.getItem("currentBoard");

        if (storedBoards !== null && storedCurrentBoard !== null) {
            try {
                dispatch(setBoard(JSON.parse(storedBoards)));
                dispatch(setCurrentBoard(JSON.parse(storedCurrentBoard)));
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        } else {
            console.error("Stored boards or current board data is null");
        }
    }, []);

    useEffect(() => {
        const storedUsers = localStorage.getItem("user");
        if (storedUsers !== null) {
            try {
                dispatch(setUsers(JSON.parse(storedUsers)));
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
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
                        setShowNewMemberForm={setShowNewMemberForm}
                        setShowMembersTable={setShowMembersTable}
                    />

                    {showNewMemberForm ? (
                        <AddMemberForm
                            setShowNewMemberForm={setShowNewMemberForm}
                        />
                    ) : showMembersTable ? (
                        <MembersTable />
                    ) : (
                        <MainPage />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Homepage;
