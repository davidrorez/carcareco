import Search from '../_components/Search'
// import moment from "moment";
// import BlueBadge from '@/_components/BlueBadge'
import { Card } from '@/_components/Card'
// import PrimaryButton from '@/_components/PrimaryButton'
// import Spinner from '@/_components/Spinner'
// import { ArrowDownTrayIcon } from '@heroicons/react/20/solid'
import { SearchCardHeader } from '../_components/SearchCardHeader'
import SearchInput from '../_components/SearchInput'
// import { EmailSentBadge, OverdueBadge } from './_components/activity/badges/IssuanceBadges'
import WorkStatusBadge from './_components/activity/badges/WorkStatusBadge'
// import PricingDownloadLink from './_components/activity/PricingDownloadLink'
import SearchParams from './_components/SearchParams'
import SearchStatusFilter from './_components/SearchStatusFilter'
// import { IOfferIssuance, IWorkIssuance } from './model'
// import FormInput from "@/_components/FormInput";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const options = await searchParams

  const columns = [
    {
      dataField: 'workNr',
      headerText: 'Trabajo',

      dataFormatter: ({ id, workNr, status }: { id: string; status: string; workNr: string }) => {
        return (
          <a href={'/home/work/' + id}>
            <h5>
              Trabajo nr. {workNr} {<WorkStatusBadge status={status}></WorkStatusBadge>}
            </h5>
          </a>
        )
      },
    },
    //secondColumn,
    {
      dataField: 'startedOn',
      headerText: 'Fecha inicio',
      dataFormatter: ({ startedOn }: { startedOn: Date }) => {
        return new Intl.DateTimeFormat('es-CR', {
          timeZone: 'America/Costa_Rica',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).format(new Date(startedOn))
      },
    },

    {
      dataField: 'clientName',
      headerText: 'Cliente',
      dataFormatter: ({ clientName }: { clientName: string }) => {
        return <h5>{clientName}</h5>
      },
    },
    {
      dataField: 'clientPhone',
      headerText: 'Teléfono',
      dataFormatter: ({ clientPhone }: { clientPhone: string }) => {
        return <h5>{clientPhone}</h5>
      },
    },
    {
      dataField: 'vehicleInfo',
      headerText: 'Vehículo',
      dataFormatter: ({ vehicleInfo }: { vehicleInfo: string }) => {
        return <h5 className="fs--1 mb-0">{vehicleInfo}</h5>
      },
    },

    {
      dataField: 'vehiclePlate',
      headerText: 'Placa',
      dataFormatter: ({ vehiclePlate }: { vehiclePlate: string }) => {
        return <h5 className="fs--1 mb-0">{vehiclePlate}</h5>
      },
    },

    {
      dataField: 'mechanicNames',
      headerText: 'Mecánicos',
    },
    {
      dataField: 'notes',
      headerText: 'Descripción',
      dataFormatter: ({ notes }: { notes: string }) => {
        return (
          <p title={notes} className="truncate" style={{ maxWidth: '300px', marginBottom: '-5px' }}>
            {notes}
          </p>
        )
      },
    },
  ]

  return (
    <main className="lg:pl-62">
      <form method="GET">
        <div className="px-4 sm:gap-4 sm:px-8 sm:py-6">
          <div className="">
            <Card header={<SearchCardHeader title="Trabajos" pageName="work"></SearchCardHeader>}>
              <Search
                searchParams={searchParams}
                resourceName="work"
                idField="id"
                rowClass={(item) => {
                  return item['status'] === 'closed' ? 'line-through' : ''
                }}
                columns={columns}
              >
                <div className="3xl:flex">
                  <div className="3xl:grid-flow-col 3xl:grid-cols-24 3xl:gap-x-2 grid grid-cols-1 gap-y-2 p-0 md:grid-flow-row md:grid-cols-12 md:gap-x-2">
                    <div className="3xl:col-span-6 md:col-span-12">
                      <SearchStatusFilter issued={options.issued === 'on'} status={options.status}></SearchStatusFilter>
                      <SearchInput placeholder="cliente, teléfono, vehículo, placa...."></SearchInput>
                    </div>
                    {/*
                        <div className="3xl:col-span-4  md:col-span-5 ">
                          <FormInput name="saleable" label="Product or service" placeholder="code or name ..." defaultValue={options.saleable}  ></FormInput>
                        </div>
                      */}

                    <div className="3xl:col-span-14 md:col-span-12">
                      <SearchParams options={options}></SearchParams>
                    </div>
                  </div>
                  { /*
                    <div className="mx-2 mt-8 text-right">
                      <PrimaryButton id="btnSubmit">Search</PrimaryButton>
                    </div>
                  */}
                </div>
              </Search>
            </Card>
          </div>
        </div>
      </form>
    </main>
  )
}
