'use client'
import {
  PhoneIcon,
  RectangleStackIcon,
  TruckIcon,
  UserCircleIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/20/solid'
import { IWorkData } from '../model'
// import moment from 'moment';
import { BaseDialogHandle } from '@/_components/BaseDialog'
import ButtonGroup, { IButtonOption } from '@/_components/ButtonGroup'
import ConfirmDialog, { ConfirmDialogHandle } from '@/_components/ConfirmDialog'
import FormSwitch from '@/_components/FormSwitch'
import HamburgerMenu from '@/_components/HamburgerMenu'
import { Field, Label } from '@headlessui/react'
import React from 'react'
import { changeWorkStatus } from '../actions/changeWorkStatus'
import { createACopy } from '../actions/createACopy'
import { deleteWork } from '../actions/deleteAnActivity'
import { startAnActivity } from '../actions/startAnActivity'
import { togglePaid } from '../actions/togglePaid'
import DeleteInvoiceDialog from './activity/DeleteInvoiceDialog'
import IssueInvoiceDialog from './activity/IssueInvoiceDialog'
// import PricingDownloadLink from './activity/PricingDownloadLink'
import SendPricingDialog from './activity/SendPricingDialog'
// import { IssuanceBadges } from './activity/badges/IssuanceBadges'
import WorkStatusBadge from './activity/badges/WorkStatusBadge'

export function WorkInformation({
  work,
  //hasRepairJobWithProductsOrServices,
}: {
  work: IWorkData
  // hasRepairJobWithProductsOrServices: boolean
}) {
  const [date, setDate] = React.useState<string | null>(null)

  React.useEffect(() => {
    setDate(
      Intl.DateTimeFormat('es-CR', {
        timeZone: 'America/Costa_Rica',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(work.startedOn))
    )
  }, [work.startedOn])

  const editPath = '/home/work/edit/' + work.id

  const deleteInvoiceRef = React.useRef<BaseDialogHandle>(null)
  const createInvoiceRef = React.useRef<BaseDialogHandle>(null)
  const sendInvoiceRef = React.useRef<BaseDialogHandle>(null)
  const deleteWorkRef = React.useRef<ConfirmDialogHandle>(null)

  const workMenuOptions = work.issuance
    ? []
    : ([
        {
          name: '+ Reparación',
          onClick: async () => {
            await startAnActivity(work.id, 'repairjob')
          },
        },
        { name: 'Editar', href: editPath },
        {
          name: 'Eliminar',
          redText: true,
          onClick: () => {
            deleteWorkRef.current?.open({
              title: 'Eliminar trabajo',
              description: '¿Estás seguro de que quieres eliminarlo?',
              confirmObj: work.id,
            })
          },
        },
      ] as IButtonOption[])

  workMenuOptions.push({
    name: 'Crear copia',
    onClick: async () => {
      await createACopy(work.id)
    },
  })

  const issuedButtonOptions = !work.issuance
    ? []
    : ([
        {
          name: 'Eliminar factura',
          isPrimary: false,
          redText: true,
          inMenu: true,
          onClick: () => {
            deleteInvoiceRef.current?.open()
          },
        },
        {
          name: work.issuance.isPaid ? 'Unpaid' : 'Payment received',
          isPrimary: !work.issuance.isPaid,
          onClick: async () => {
            await togglePaid(work.id, !work.issuance.isPaid)
          },
        },
        {
          name: 'Send invoice',
          isPrimary: false,
          onClick: () => {
            sendInvoiceRef.current?.open()
          },
        },
      ] as IButtonOption[])

  const editButtonOptions = [] as IButtonOption[]

  if (!work.issuance) {
    if (work.status !== 'closed') {
      editButtonOptions.push({
        name: 'Marcar como cerrado',
        onClick: async () => {
          await changeWorkStatus(work.id, 'Closed')
        },
      })
    } else if (work.status === 'closed') {
      editButtonOptions.push({
        name: 'Abrir',
        isPrimary: true,
        onClick: async () => {
          await changeWorkStatus(work.id, 'Default')
        },
      })
    }

    /*
        if(hasRepairJobWithProductsOrServices && work.status!=='closed' ){
            editButtonOptions.push({
                name: 'Emitir factura',
                onClick:() => { createInvoiceRef.current?.open() },
                isPrimary:true 
            });
        }
        */
  }

  return (
    <>
      <IssueInvoiceDialog work={work} dialogRef={createInvoiceRef}></IssueInvoiceDialog>
      <DeleteInvoiceDialog work={work} dialogRef={deleteInvoiceRef}></DeleteInvoiceDialog>
      <SendPricingDialog work={work} dialogRef={sendInvoiceRef}></SendPricingDialog>
      <ConfirmDialog
        ref={deleteWorkRef}
        onConfirm={async () => {
          await deleteWork(work.id)
        }}
      ></ConfirmDialog>
      <div className="lg:col-start-3 lg:row-end-1">
        <h2 className="sr-only">Resumen</h2>
        <dl className="flex flex-wrap">
          <div className="flex-auto xl:pl-6 xl:pt-6">
            <dt className="mr-2 text-base font-semibold text-gray-900">
              Trabajo nr {work.number} <WorkStatusBadge status={work.status}></WorkStatusBadge>
            </dt>
            <dd className="text-sm/6 text-gray-500">
              <time dateTime={new Date(work.startedOn).toISOString()}>{date ?? '—'}</time>
            </dd>
          </div>

          <div className="col-span-2 flex-none self-end px-2 pt-4 xl:px-6">
            <dt className="sr-only"></dt>
            <dd className="inline-flex">
              <HamburgerMenu options={workMenuOptions}></HamburgerMenu>
            </dd>
          </div>
          <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6"></div>
          <div className="mt-4 flex w-full flex-none gap-x-4 xl:px-6">
            <dt className="flex-none">
              <span className="sr-only">Cliente</span>
              <UserCircleIcon className="h-6 w-5 text-gray-400" />
            </dt>
            <dd className="text-sm/6 font-medium text-gray-900">
              {work.clientName?.trim() ? work.clientName : <span className="italic text-gray-500">Sin cliente</span>}
            </dd>
          </div>

          <div className="mt-4 flex w-full flex-none gap-x-4 xl:px-6">
            <dt className="flex-none">
              <span className="sr-only">Teléfono</span>
              <PhoneIcon className="h-6 w-5 text-gray-400" />
            </dt>
            <dd className="text-sm/6 font-medium text-gray-900">
              {work.clientPhone?.trim() ? work.clientPhone : <span className="italic text-gray-500">Sin teléfono</span>}
            </dd>
          </div>

          <div className="mt-4 flex w-full flex-none gap-x-4 xl:px-6">
            <dt className="flex-none">
              <span className="sr-only">Vehículo</span>
              <TruckIcon className="h-6 w-5 text-gray-400" />
            </dt>
            <dd className="text-sm/6 text-gray-900">
              {work.vehicleInfo?.trim() ? work.vehicleInfo : <span className="italic text-gray-500">Sin vehículo</span>}
            </dd>
          </div>

          <div className="mt-4 flex w-full flex-none gap-x-4 xl:px-6">
            <dt className="flex-none">
              <span className="sr-only">Placa</span>
              <RectangleStackIcon className="h-6 w-5 text-gray-400" />
            </dt>
            <dd className="text-sm/6 text-gray-900">
              {work.vehiclePlate?.trim() ? work.vehiclePlate : <span className="italic text-gray-500">Sin placa</span>}
            </dd>
          </div>

          <div className="mt-4 flex w-full flex-none gap-x-4 xl:px-6">
            <dt className="flex-none">
              <span className="sr-only">Estado</span>
              <WrenchScrewdriverIcon aria-hidden="true" className="h-6 w-5 text-gray-400" />
            </dt>
            <dd className="text-sm/6 text-gray-900">
              {work.mechanics?.length ? (
                work.mechanics.map((item) => item.name).join(', ')
              ) : (
                <span className="italic text-gray-500">Sin mecánicos</span>
              )}
            </dd>
          </div>

          <div className="mt-6 flex w-full xl:px-6">
            <dt className="flex-auto">
              {!work.issuance && work.status !== 'closed' && (
                <Field className="mt-1 flex items-center">
                  <FormSwitch
                    name="inprogress"
                    defaultChecked={work.status === 'inprogress'}
                    onChange={async (val) => {
                      const status = val ? 'InProgress' : 'Default'
                      await changeWorkStatus(work.id, status)
                    }}
                  ></FormSwitch>
                  <Label as="span" className="ml-3 text-sm">
                    <span className="text-gray-500">En curso</span>
                  </Label>
                </Field>
              )}
            </dt>
            <dd>
              {work.issuance ? (
                <ButtonGroup options={issuedButtonOptions}></ButtonGroup>
              ) : (
                <ButtonGroup options={editButtonOptions}></ButtonGroup>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </>
  )
}
