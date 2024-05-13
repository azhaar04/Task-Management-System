import axios from "axios";

export async function login(data) {
    try {
        const response = await axios.post("/login", data);
        return response;
    } catch {
        return {
            email: "something@gmail.com",
            name: "Azhar",
            accessToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJzb21ldGhpbmdAZ21haS5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.FIfSgKdodMnJ8V7CTLYzSYvBCLX25ZvoZeFOKyW6wKg",
        };
    }
}

// // User login function
// function loginUser(credentials) {
//     return fetch("https://your-backend.com/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(credentials),
//     })
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error("Invalid credentials");
//             }
//             return response.json();
//         })
//         .then((data) => {
//             // Save token to browser storage
//             localStorage.setItem("token", data.token);
//             return data;
//         });
// }

// // Fetch authorized user data
// function fetchAuthorizedUser() {
//     const token = localStorage.getItem("token");
//     if (!token) {
//         throw new Error("No token found");
//     }

//     return fetch("https://dummyjson.com/user/me", {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     }).then((response) => {
//         if (!response.ok) {
//             throw new Error("Authorization failed");
//         }
//         return response.json();
//     });
// }

// // Usage example
// loginUser({ username: "example", password: "password" })
//     .then(() => {
//         return fetchAuthorizedUser();
//     })
//     .then((user) => {
//         console.log("Authorized user:", user);
//     })
//     .catch((error) => {
//         console.error("Error:", error.message);
//     });
