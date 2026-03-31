import QueryFormInput from '@/_components/QueryFormInput'

export default function SearchParams({
  options,
}: {
  options: any // eslint-disable-line @typescript-eslint/no-explicit-any
}) {
  return (
    <div className="grid gap-2 sm:grid-flow-col">
      {options.issued === 'on' && (
        <>
          <div className="col-span-1">
            <QueryFormInput name="invoiceFrom" label="Factura desde" type="date" defaultValue={options.invoiceFrom} />
          </div>

          <div className="col-span-1">
            <QueryFormInput name="invoiceTo" label="Factura hasta" type="date" defaultValue={options.invoiceTo} />
          </div>
        </>
      )}
      <div className="col-span-1">
        <QueryFormInput name="workFrom" label="Trabajo desde" type="date" defaultValue={options.workFrom} />
      </div>
      <div className="col-span-1">
        <QueryFormInput name="workTo" label="Trabajo hasta" type="date" defaultValue={options.workTo} />
      </div>
    </div>
  )
}
