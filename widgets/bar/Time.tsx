import { GLib, Variable } from 'astal'
import { Gtk } from 'astal/gtk4'

function TimePanel(
  { weekdayFormat = '%A', dateFormat = '%F', timeFormat = '%T' },
) {
  const weekday = Variable('').poll(
    1000,
    () => GLib.DateTime.new_now_local().format(weekdayFormat)!,
  )

  const date = Variable('').poll(
    1000,
    () => GLib.DateTime.new_now_local().format(dateFormat)!,
  )

  const time = Variable('').poll(
    1000,
    () => GLib.DateTime.new_now_local().format(timeFormat)!,
  )

  return (
    <box
      spacing={8}
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['container']}
    >
      <label>{weekday()}</label>
      <box spacing={3}>
        <image iconName='calendar' />
        <label>{date()}</label>
      </box>
      <box spacing={3}>
        <image iconName='clock' />
        <label>{time()}</label>
      </box>
    </box>
  )
}

export default TimePanel
