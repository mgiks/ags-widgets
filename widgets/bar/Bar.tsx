import { App, Astal, Gdk } from 'astal/gtk4'
import TimePanel from './Time'
import LWBPanel from './LWBPanel'
import WorkspacesPanel from './WorkspacesPanel'
import CurrentAppPanel from './CurrentAppPanel'
import TimeUntilDeathPanel from './TimeUntilDeathPanel'

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

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
        <box spacing={5}>
          <TimePanel />
          <WorkspacesPanel />
        </box>
        <box>
          <CurrentAppPanel />
        </box>
        <box spacing={5}>
          <TimeUntilDeathPanel />
          <LWBPanel />
        </box>
      </centerbox>
    </window>
  )
}
