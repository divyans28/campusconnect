export function FormInput({
  label,
  type = 'text',
  id,
  name,
  value,
  onChange,
  required = false,
  placeholder,
  className = '',
}: {
  label: string
  type?: string
  id: string
  name: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  placeholder?: string
  className?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 ${className}`}
        placeholder={placeholder}
      />
    </div>
  )
}

export function FormSelect({
  label,
  id,
  name,
  value,
  onChange,
  required = false,
  children,
  className = '',
}: {
  label: string
  id: string
  name: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  required?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 bg-white ${className}`}
      >
        {children}
      </select>
    </div>
  )
}

export function FormTextarea({
  label,
  id,
  name,
  value,
  onChange,
  required = false,
  placeholder,
  rows = 4,
  className = '',
}: {
  label: string
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
  placeholder?: string
  rows?: number
  className?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 resize-none ${className}`}
        placeholder={placeholder}
      />
    </div>
  )
}
