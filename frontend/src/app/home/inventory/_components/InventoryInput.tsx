'use client'

import FormInput from '@/_components/FormInput'
import FormLabel from '@/_components/FormLabel'
import FormTextArea from '@/_components/FormTextArea'
import PrimaryButton from '@/_components/PrimaryButton'
import SecondaryButton from '@/_components/SecondaryButton'
import { useRouter } from 'next/navigation'
import { ILocation, ISparepartData } from '../model'
import NamedLocation from './NamedLocation'
export default function InventoryInput({
  allLocations,
  sparepart,
}: {
  allLocations: ILocation[]
  sparepart?: ISparepartData | undefined
}) {
  const router = useRouter()

  return (
    <>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {sparepart?.code && (
              <div className="sm:col-span-2">
                <FormInput name="code" defaultValue={sparepart.code} label="Código" readOnly />
              </div>
            )}
            <div className="sm:col-span-2">
              {' '}
              <FormInput name="name" defaultValue={sparepart?.name} label="Nombre"></FormInput>
            </div>
            <div className="sm:col-span-2">
              {' '}
              <FormInput
                name="price"
                type="number"
                step="any"
                defaultValue={sparepart?.price}
                label="Precio"
              ></FormInput>
            </div>
            <div className="sm:col-span-2">
              {' '}
              <FormInput
                name="quantity"
                type="number"
                step="any"
                defaultValue={sparepart?.quantity}
                label="Cantidad"
              ></FormInput>
            </div>
            <div className="sm:col-span-full lg:col-span-4">
              <FormLabel name="location" label="Ubicación"></FormLabel>
              <NamedLocation sparepartLocationId={sparepart?.storageId} allLocations={allLocations}></NamedLocation>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-900/10 pb-12">
        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <FormTextArea name="about" label="Descripción" defaultValue={sparepart?.description}></FormTextArea>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <SecondaryButton onClick={() => router.back()}>Cancelar</SecondaryButton>
        <PrimaryButton onClick={() => {}}>Guardar</PrimaryButton>
      </div>
    </>
  )
}
