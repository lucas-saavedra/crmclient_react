import React from 'react'

const Spinner = (props) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            display="block"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 100 100"
        >
            <circle
                cx="50"
                cy="50"
                r="32"
                fill="none"
                stroke="#85a2b6"
                strokeDasharray="50.26548245743669 50.26548245743669"
                strokeLinecap="round"
                strokeWidth="8"
          
            ></circle>
        </svg>

    )
}

export default Spinner