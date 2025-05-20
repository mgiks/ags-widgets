import { GLib, Variable } from 'astal'
import { Gtk } from 'astal/gtk4'

function TimeUntilDeathPanel() {
  const birthday = GLib.DateTime.new_local(2006, 8, 31, 0, 0, 0)
  const deathDate = birthday.add_years(80)!

  const days = Variable('').poll(
    1000,
    () => {
      const currentTime = GLib.DateTime.new_now_local()
      return (deathDate.difference(currentTime).valueOf() / 1000000 / 60 / 60 /
        24)
        .toFixed(0)
        .toString() + ' days left alive'
    },
  )

  return (
    <box
      spacing={8}
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['container']}
    >
      <box spacing={3}>
        <image iconName='skull' />
        <label>{days()}</label>
      </box>
    </box>
  )
}

export default TimeUntilDeathPanel
