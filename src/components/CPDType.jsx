
const notificationMethods = [
  { id: 'Formal learning', name: 'Formal learning' },
  { id: 'Self-directed study', name: 'Self-directed study' },
  { id: 'Contributing to the profession', name: 'Contributing to the profession' },
]

export default function CPDType({ value, setValue }) {

  return (
    <div className="mt-4">
      <label className="text-base font-semibold text-gray-900">CPD type *</label>
      <fieldset className="mt-4">
        <legend className="sr-only">Notification method</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
          {notificationMethods.map((notificationMethod) => (
            <div key={notificationMethod.id} className="flex items-center">
              <input
                id={notificationMethod.id}
                name="notification-method"
                type="radio"
                onChange={(e) => {
                  setValue(e.target.id)
                }}
                defaultChecked={notificationMethod.id === 'Formal learning'}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                {notificationMethod.name}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
