import React from 'react'
import PropTypes from 'prop-types'


const FormInput = (props) => {
    const { className, value, onBlur, onChange, label, htmlForm, id, type, placeholder } = props;
    return (

        <div className={className} >
            <label
                className="block text-gray-700 font-bold mb-2" htmlFor={htmlForm}
            >{label}</label>
            <input
                className="
            shadow appearance-none 
            border rounded w-full
            py-2 px-3 text-gray-700
            leading-tight
            focus:outlone-none
            focus:shadow-outline
            "
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                id={id}
                type={type}
                placeholder={placeholder}
            />
        </div>

    )
}
FormInput.propTypes = {
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    htmlForm: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
}

export default FormInput