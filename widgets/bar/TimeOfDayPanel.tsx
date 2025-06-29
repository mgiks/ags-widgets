import { createPoll } from 'ags/time'
import GLib from 'gi://GLib?version=2.0'
import Gtk from 'gi://Gtk?version=4.0'

function TimeOfDayPanel() {
  const timeOfDay = createPoll(
    '',
    1000,
    () => GLib.DateTime.new_now_local().format('%T')!,
  )

  return (
    <box
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['panel']}
      spacing={3}
    >
      <image iconName='clock' />
      <box>
        <label label={timeOfDay} />
      </box>
    </box>
  )
}

export default TimeOfDayPanel
