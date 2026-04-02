'use client'

import React from 'react'
import { deleteInventory } from '@/app/home/inventory/deleteInventory'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ChevronDownIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon
} from '@heroicons/react/20/solid'
import Link from 'next/link'
import ConfirmDialog, { ConfirmDialogHandle } from './ConfirmDialog'

export default function DisplayOptionsMenu({
  id,
  pageName,
}: {
  id: string
  pageName: string
}) {

  const confirmRemoveActivityRef = React.useRef<ConfirmDialogHandle>(null);

  const handleDelete = () => {
    confirmRemoveActivityRef.current?.open({
      title: "Eliminar",
      description: "¿Seguro que quieres eliminar este registro?",
      confirmObj: id
    })
  }

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
          Options
          <ChevronDownIcon className="-mr-1 size-5 text-gray-400" />
        </MenuButton>

        <MenuItems className="absolute right-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg">
          <div className="py-1">
            <MenuItem>
              <Link
                href={`/home/${pageName}/edit/${id}`}
                className="flex items-center px-4 py-2 text-sm text-gray-700"
              >
                <PencilSquareIcon className="mr-3 size-5 text-gray-400" />
                Editar
              </Link>
            </MenuItem>

            <MenuItem>
              <Link
                href={`/home/${pageName}/new`}
                className="flex items-center px-4 py-2 text-sm text-gray-700"
              >
                <PlusCircleIcon className="mr-3 size-5 text-gray-400" />
                Crear
              </Link>
            </MenuItem>
          </div>

          <div className="py-1">
            <MenuItem>
              <button
                onClick={handleDelete}
                className="flex w-full items-center px-4 py-2 text-sm text-red-600"
              >
                <TrashIcon className="mr-3 size-5 text-gray-400" />
                Eliminar
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>

      <ConfirmDialog
        ref={confirmRemoveActivityRef}
        onConfirm={async (id) => {
          await deleteInventory(id)
        }}
      />
    </>
  )
}