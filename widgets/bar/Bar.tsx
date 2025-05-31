import { App, Astal, Gdk } from 'astal/gtk4'
import WorkspacesPanel from './WorkspacesPanel'
import CurrentAppPanel from './CurrentAppPanel'
import TimeUntilDeathPanel from './TimeUntilDeathPanel'
import TimePanel from './TimePanel'
import LWBPanel from './LWBPanel'

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
  const spacing = 10

  return (
    <window
      visible
      resizable={true}
      cssClasses={['Bar']}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      <centerbox cssName='centerbox'>
        <box spacing={spacing}>
          <TimePanel />
          <WorkspacesPanel />
        </box>
        <box>
          <CurrentAppPanel />
        </box>
        <box spacing={spacing}>
          <TimeUntilDeathPanel />
          <LWBPanel />
        </box>
      </centerbox>
    </window>
  )
}
