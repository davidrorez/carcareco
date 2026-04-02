'use client'

import { Card } from '@/_components/Card'
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon'
import Narrow from './Narrow'
import { useRouter } from 'next/navigation'

export default function Main({
  header,
  children,
  narrow = true,
  backHref,
}: {
  narrow?: boolean | undefined
  children: React.ReactNode
  header: React.ReactNode,
  backHref?: string
}) {

  const router = useRouter();
  return (
    <>
      <main className="lg:pl-62 pb-8">
      {backHref && (
        <div className="px-4 pt-4 lg:px-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Volver
          </button>
        </div>
      )}

        <div className="px-4 sm:px-6 sm:py-10 lg:px-8 lg:py-6">
          {narrow ? (
            <Narrow>
              <Card header={header}> {children}</Card>
            </Narrow>
          ) : (
            <Card header={header}> {children}</Card>
          )}
        </div>
      </main>
    </>
  )
}
