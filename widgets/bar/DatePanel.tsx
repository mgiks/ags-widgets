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
    <Gtk.Box
      cssClasses={['panel']}
      spacing={2}
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
    >
      <Gtk.Image iconName='calendar' />
      <Gtk.Box>
        <Gtk.Label label={date} />
      </Gtk.Box>
    </Gtk.Box>
  )
}

export default DatePanel
