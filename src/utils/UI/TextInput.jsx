import React from 'react'

const TextInput = ({
  label = '',
  type = 'text',
  onChange,
  onBlur,
  touched = false,
  error = '',
  defaultValue = '',
  ID = '',
  placeholder = '',
  labelStyle = {},
  inputStyle = {},
  containerStyle = '',
  rows = 10,
}) => {
  return (
    <div className={`col-span-full ${containerStyle}`}>
      <label htmlFor={ID} className="block text-sm font-medium leading-6 text-gray-900" style={{ ...labelStyle }}>
        {label}
      </label>
      <div className="mt-2">
        {type === 'text-area' ? (
          <textarea
            id={ID}
            name={ID}
            placeholder={placeholder}
            rows={rows}
            defaultValue={defaultValue}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={ID}
            style={{ ...inputStyle }}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        ) : (
          <input
            id={ID}
            name={ID}
            placeholder={placeholder}
            type={type}
            defaultValue={defaultValue}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={ID}
            className={`px-6 block w-full rounded-md border-0 outline-none py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            style={{ ...inputStyle }}
          />
        )}
        {touched && error && <p className='px-6 mt-1 text-red-600'>{`*${error}`}</p>}
      </div>
    </div>
  )
}

export default TextInput