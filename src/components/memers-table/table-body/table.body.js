import React from "react";

function TableBody({ items, columns }) {
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
