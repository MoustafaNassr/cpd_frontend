import React from 'react'

const SelectInput = ({
  label = '',
  firstOption = '',
  onChange,
  onBlur,
  error = '',
  touched = false,
  options = [],
  ID = '',
  optionValue = '', // key name of the option object to be set to the value
  optionLabel = '', // key name of the option object to be used as the label of the option
  containerStyle = ''
}) => {
  return (
    <div className={`${containerStyle}`}>
      <label htmlFor={ID} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <select
          id={ID}
          onChange={onChange}
          onBlur={onBlur}
          name={ID}
          className="px-6 block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          <option>{firstOption}</option>
          {options?.map((option) => (
            <option key={option[optionValue]} value={option[optionValue]}>{option[optionLabel]}</option>
          ))}
        </select>
        {touched && error && <p className='px-6 mt-1 text-red-600'>{`*${error}`}</p>}
      </div>
    </div>
  )
}

export default SelectInput