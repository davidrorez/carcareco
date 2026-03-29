import React, { useImperativeHandle, useState } from 'react'
import { EditableCellHandle, IEditableNumericCellProps, Input } from './EditableCell'

const EditableNumberCell = React.forwardRef<
  EditableCellHandle<number | null>,
  IEditableNumericCellProps<number | null>
>((props, ref) => {
  const { defaultValue, placeholder, id, name, isEditing, className, step, isMoney, isPercentage, required } = props

  const [internalValue, setInternalValue] = useState(defaultValue)

  useImperativeHandle(ref, () => ({
    getValue(): number | null {
      return internalValue
    },
    setValue(value: number | null) {
      return setInternalValue(value)
    },
  }))

  const getFormattedValue = () => {
    if (internalValue === 0) return ''
    if (isMoney) {
      if (!internalValue) return ''
      return new Intl.NumberFormat('et-EE', { style: 'currency', currency: 'EUR' }).format(internalValue)
    }
    if (isPercentage) return internalValue + ' %'
    return internalValue
  }
  if (!isEditing) return getFormattedValue()

  return Input(
    required,
    id,
    name,
    'number',
    step,
    placeholder,
    internalValue,
    (e) => {
      const raw = e.currentTarget.value

      if (raw === '') {
        setInternalValue(null)
        return
      }

      const value = +raw
      setInternalValue(value < 0 ? 0 : value)
    },
    className
  )
})
EditableNumberCell.displayName = 'EditableNumberCell'
export { EditableNumberCell }
