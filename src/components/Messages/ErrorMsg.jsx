import React from 'react'

const ErrorMsg = ({ msg }) => {
    return (
        <div className={`p-4 mb-4 text-red-700 bg-red-100 rounded-lg dark:bg-green-200 dark:text-green-800`} role="alert">
            <span className="font-medium">Error: </span>{msg}
        </div>
    )
}

export default ErrorMsg