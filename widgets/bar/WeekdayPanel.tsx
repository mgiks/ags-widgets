import { GLib, Variable } from 'astal'
import { wrapWithRevealer } from './utils/wrapWithRevealer'

function WeekdayPanel(
  { isSeparate, weekdayFormat = '%A' }: {
    isSeparate: boolean
    weekdayFormat?: string
  },
) {
  const weekday = Variable('').poll(
    1000,
    () => GLib.DateTime.new_now_local().format(weekdayFormat)!,
  )

  const classes = isSeparate ? ['container'] : ['']

  return (
    <box cssClasses={classes} spacing={3}>
      <image iconName={'weekday'} />
      <box>
        {wrapWithRevealer(<label>{weekday()}</label>)}
      </box>
    </box>
  )
}

export default WeekdayPanel
