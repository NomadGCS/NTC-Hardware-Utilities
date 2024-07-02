import React from "react";


export default function Label({children}) {
    return (
        <label style={{fontSize: '0.8em'}}>
            {children}
        </label>
    )
}