import { GLib, timeout, Variable } from 'astal'
import { wrapWithRevealer } from './utils/wrapWithRevealer'

function DatePanel(
  { isSeparate, dateFormat = '%F' }: {
    isSeparate: boolean
    dateFormat?: string
  },
) {
  const date = Variable('').poll(
    1000,
    () => GLib.DateTime.new_now_local().format(dateFormat)!,
  )

  const classes = isSeparate ? ['container'] : ['']

  return (
    <box
      cssClasses={classes}
      spacing={2}
    >
      <image iconName='calendar' />
      <box>
        {wrapWithRevealer(<label>{date()}</label>)}
      </box>
    </box>
  )
}

export default DatePanel
