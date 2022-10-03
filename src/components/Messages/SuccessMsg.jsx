
const SuccessMsg = ({ msg }) => {
    return (
        <div className={`p-4 mb-4 text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800`} role="alert">
            <span > Success! </span> {msg}
        </div>
    )
}

export default SuccessMsg