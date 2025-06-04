import { GLib, Variable } from 'astal'
import { wrapWithRevealer } from './utils/wrapWithRevealer'

function TimeOfDayPanel(
  { isSeparate, timeOfDayFormat = '%T' }: {
    isSeparate: boolean
    timeOfDayFormat?: string
  },
) {
  const timeOfDay = Variable('').poll(
    1000,
    () => GLib.DateTime.new_now_local().format(timeOfDayFormat)!,
  )

  const classes = isSeparate ? ['container'] : ['']

  return (
    <box
      cssClasses={classes}
      spacing={3}
    >
      <image iconName='clock' />
      <box>
        {wrapWithRevealer(<label>{timeOfDay()}</label>)}
      </box>
    </box>
  )
}

export default TimeOfDayPanel
