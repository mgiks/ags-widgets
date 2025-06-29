import { createPoll } from 'ags/time'
import GLib from 'gi://GLib?version=2.0'
import Gtk from 'gi://Gtk?version=4.0'

function DatePanel() {
  const date = createPoll(
    '',
    1000,
    () => GLib.DateTime.new_now_local().format('%F')!,
  )

  return (
    <box
      cssClasses={['panel']}
      spacing={2}
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
    >
      <image iconName='calendar' />
      <box>
        <label label={date} />
      </box>
    </box>
  )
}

export default DatePanel
