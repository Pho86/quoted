
export default function Input({
   type, value,
   placeholder,
   onChange,
   name,
   label,
   required,
   input = true,
   rows = 5
}: {
   type: string
   value?: string
   placeholder: string
   onChange: (e: any) => void
   name: string
   label?: boolean
   required?: boolean
   input?: boolean
   rows?: number
}) {
   return <>
      <div className="flex flex-col gap-1">
         {label && <label className="text-gray-800 text-sm">enter {name}{required && <span className="text-red-500 font-bold"> *</span>}</label>}
         {input ? <input className="p-2 border-2 border-gray-400 rounded-md" name={name} required={required} type={type} value={value} placeholder={placeholder} onChange={onChange} />
            : <textarea className="p-2 border-2 border-gray-400 rounded-md" name={name} rows={rows} required={required} value={value} placeholder={placeholder} onChange={onChange} />}
      </div>
   </>
} 