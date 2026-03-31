'use client'

import { FormRadio } from "@/_components/FormInput"

export default function SearchStatusFilter({
  status,
  issued,
}: {
  status?: string | undefined
  issued: boolean
}) {
  function submitFormOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
    event.currentTarget.form?.submit();
  }

  return (
    <div className=" flex gap-x-2 mb-2">
      <div className="flex   items-center  gap-x-2 ">
        <FormRadio id="all" label="Todos" name="status" onChange={submitFormOnChange} defaultChecked={(!status || status === 'all')} value="all" ></FormRadio>
      </div>
      {!issued && <div className="flex  items-center  gap-x-2 ">
        <FormRadio id="inprogress" label="En curso" name="status" onChange={submitFormOnChange} defaultChecked={(status === 'inprogress')} value="inprogress" ></FormRadio>
      </div>}
      {!issued && <div className="flex   items-center  gap-x-2 ">
        <FormRadio id="closed" label="Cerrado" name="status" onChange={submitFormOnChange} defaultChecked={(status === 'closed')} value="closed" ></FormRadio>
      </div>}
      {issued && <div className="flex   items-center  gap-x-2 ">
        <FormRadio id="overdue" label="Vencido" name="status" onChange={submitFormOnChange} defaultChecked={(status === 'overdue')} value="overdue" ></FormRadio>
      </div>}
    </div>
  )
}