import { createPoll } from 'ags/time'
import GLib from 'gi://GLib?version=2.0'
import Gtk from 'gi://Gtk?version=4.0'

function WeekdayPanel() {
  const weekday = createPoll(
    '',
    1000,
    () => GLib.DateTime.new_now_local().format('%A')!,
  )

  return (
    <Gtk.Box
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['panel']}
      spacing={3}
    >
      <Gtk.Image iconName={'weekday'} />
      <Gtk.Box>
        <Gtk.Label label={weekday} />
      </Gtk.Box>
    </Gtk.Box>
  )
}

export default WeekdayPanel
