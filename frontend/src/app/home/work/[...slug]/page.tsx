'use server'

import { Card, CardHeader } from '@/_components/Card'
import { httpGet } from '@/_lib/server/query-api'
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon'
import clsx from 'clsx'
import Link from 'next/link'
import Activity from '../_components/Activity'
import ActivitySelect from '../_components/ActivitySelect'
import Activities from '../_components/AllActivities'
import NoProducts from '../_components/NoProducts'
import { ActivityCreatedBy } from '../_components/activity/ActivityCreatedBy'
import PricingDownloadLink from '../_components/activity/PricingDownloadLink'
import { IssuanceBadges } from '../_components/activity/badges/IssuanceBadges'
import { getActivityDisplayName } from '../_components/activity/getActivityDisplayName'
import { createOrUpdateProducts } from '../actions/createOrUpdateProducts'
import { IActivities, IOfferIssuance, IWorkData } from '../model'

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const [id, activityId, action] = (await params).slug

  let data = await httpGet('work/' + id)
  const work = (await data.json()) as IWorkData

  data = await httpGet(!activityId ? 'work/' + id + '/activities' : 'work/' + id + '/activities/' + activityId)
  const activities = (await data.json()) as IActivities

  const isEditing = action == 'edit'
  const current = activities.current

  const activity = activities?.items?.find((x) => x.id == current.id)
  if (!activity) throw new Error('Activity expected')
  const activityName = activity.name
  const activityNumber = activity.number

  data = await httpGet('pricings/offers/' + work.id)
  const issueances = (await data.json()) as IOfferIssuance[]
  const issuance = issueances.find((x) => x.id === activity?.id)

  const activityDisplayName = getActivityDisplayName(activityName, activityNumber, issuance?.number)

  return (
    <div>
      <div className="px-4 pt-4 xl:px-8 xl:pt-6">
        <Link
          href={`/home/work`}
          className="inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Volver
        </Link>
      </div>
      <Activities work={work} issueances={issueances} activities={activities}></Activities>
      <main className="lg:pl-62 2xl:pr-108 pl-0">
<div className="hidden xl:block px-4 pt-4 xl:px-8 xl:pt-6">
  <Link
    href={`/home/work`}
    className="inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-900"
  >
    <ArrowLeftIcon className="h-4 w-4" />
    Volver
  </Link>
</div>
        <div>
          <div className="px-4 xl:px-8 xl:py-10 xl:py-6">
            <div className="flex flex-col border-t border-gray-200 xl:border-t-0">
              {activity && (
                <Card
                  header={
                    <CardHeader>
                      <div className={clsx('mb-4 flex gap-x-2 xl:ml-4')}>
                        <div className="grid grid-flow-col gap-2">
                          <div className="-mr-2">
                            <ActivitySelect
                              issueances={issueances}
                              work={work}
                              activities={activities}
                            ></ActivitySelect>{' '}
                          </div>
                          <div className="xs:-ml-4 my-1 -ml-2">
                            <h3
                              className={clsx(
                                activities.items.length > 1 && 'hidden',
                                'text-base font-semibold text-gray-900 2xl:block'
                              )}
                            >
                              {activityDisplayName}
                            </h3>
                          </div>
                          <div className="my-1">
                            {issuance && (
                              <PricingDownloadLink
                                name="Offer"
                                hideLabel={!!issuance.number}
                                id={issuance.id}
                                number={issuance.number}
                              ></PricingDownloadLink>
                            )}
                          </div>
                          <div className="my-1 flex gap-x-2">
                            {issuance && <IssuanceBadges issueance={issuance}></IssuanceBadges>}{' '}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4 hidden gap-x-2 xl:ml-4 xl:flex">
                        <ActivityCreatedBy activity={activity}></ActivityCreatedBy>
                      </div>
                    </CardHeader>
                  }
                >
                  {current.products.length == 0 && !current?.notes && !isEditing ? (
                    <NoProducts work={work} activityId={current.id}></NoProducts>
                  ) : (
                    <form action={createOrUpdateProducts}>
                      <input type="hidden" name="workId" value={work.id}></input>
                      <input type="hidden" name="activityId" value={current.id}></input>
                      <input type="hidden" name="activityName" value={activityName}></input>
                      <input type="hidden" name="activityNumber" value={activityNumber}></input>
                      <Activity issuance={issuance} edit={isEditing} work={work} activities={activities}></Activity>
                    </form>
                  )}
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
