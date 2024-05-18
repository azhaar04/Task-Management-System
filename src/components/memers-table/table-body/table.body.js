import React from "react";
import { useSelector } from "react-redux";
function TableBody({ columns }) {
    const items = useSelector((state) => state.userReducer.users);
    return (
        <tbody>
            {items.map((item, index) => (
                <tr key={index}>
                    {columns.map((column) =>
                        column.content(item, column.path, index)
                    )}
                </tr>
            ))}
        </tbody>
    );
}

export default TableBody;
