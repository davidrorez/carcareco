import { IActivity } from '../../model'

export function ActivityCreatedBy({ activity }: { activity?: IActivity }) {
  return (
    <div className="flex items-center gap-x-2 text-xs/5 text-gray-500">
      <p className="whitespace-nowrap">
        {Intl.DateTimeFormat('es-CR', {
          timeZone: 'America/Costa_Rica',
          dateStyle: 'long',
          timeStyle: 'short',
        }).format(new Date(activity?.startedOn || ''))}
      </p>
      <svg viewBox="0 0 2 2" className="size-0.5 fill-current">
        <circle r={1} cx={1} cy={1} />
      </svg>
      <p className="truncate">Creado por {activity?.startedBy}</p>
    </div>
  )
}
