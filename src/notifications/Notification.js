import React from 'react';
import './notification.css';

export function showErrMsg(msg) {
    return (
        <div className="errMsg">
            {msg}
        </div>
    )
}

export function showSuccessMsg(msg) {
    return (
        <div className="successMsg">
            {msg}
        </div>
    )
}
