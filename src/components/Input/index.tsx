
export default function Input({
   type, value,
   placeholder,
   onChange,
   name,
   label,
   required
}: {
   type: string
   value?: string
   placeholder: string
   onChange: (e: any) => void
   name: string
   label?: boolean
   required?: boolean
}) {
   return <>
   {label && <label className="text-gray-700 text-sm">{name}</label>}
   <input className="p-2 border-2 border-gray-300 rounded-md" name={name} required={required} type={type} value={value} placeholder={placeholder} onChange={onChange} />
   </>
} 