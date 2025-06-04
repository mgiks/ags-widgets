import { App, Astal, Gdk, Gtk } from 'astal/gtk4'
import WorkspacesPanel from './WorkspacesPanel'
import CurrentAppPanel from './CurrentAppPanel'
import TimeUntilDeathPanel from './TimeUntilDeathPanel'
import TimePanel from './TimePanel'
import LWBPanel from './LWBPanel'
import PowerOffButton from './PowerOffButton'
import { barPanelsSpacing } from './consts'

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      resizable={true}
      cssClasses={['Bar']}
      valign={Gtk.Align.CENTER}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      <centerbox cssName='centerbox'>
        <box spacing={barPanelsSpacing}>
          <TimePanel />
          <WorkspacesPanel />
        </box>
        <box>
          <CurrentAppPanel />
        </box>
        <box spacing={barPanelsSpacing}>
          <TimeUntilDeathPanel />
          <LWBPanel />
          <PowerOffButton />
        </box>
      </centerbox>
    </window>
  )
}
