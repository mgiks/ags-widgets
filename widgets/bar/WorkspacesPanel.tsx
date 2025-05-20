import { bind, Variable } from 'astal'
import Hyprland from 'gi://AstalHyprland'

type WorkspaceType = {
  workspace: Hyprland.Workspace
}

const hyprland = Hyprland.get_default()

function Workspace({ workspace }: WorkspaceType) {
  let cssClasses = ['workspace']

  const occupied = hyprland.get_workspace(workspace.id)?.get_clients().length
  occupied && cssClasses.push('occupied-workspace')

  const focused = hyprland.focusedWorkspace.id == workspace.id
  focused && cssClasses.push('focused-workspace')

  let visible = false

  if (occupied || focused) {
    visible = true
  }

  return (
    <box visible={visible} cssClasses={cssClasses}>
      <label widthRequest={25}>
        {workspace.id.toString().slice(-1)}
      </label>
    </box>
  )
}

export default function WorkspacesPanel() {
  function range(max: number) {
    return [...Array(max).keys()]
  }

  const workspaces = Variable.derive(
    [
      bind(hyprland, 'focusedWorkspace'),
      bind(hyprland, 'clients'),
      bind(hyprland, 'focusedClient'),
      bind(hyprland.focusedClient, 'workspace'),
    ],
    (_, __) => {
      return range(10).map((i) => (
        Workspace({ workspace: Hyprland.Workspace.dummy(i + 1, null) })
      ))
    },
  )

  return (
    <box cssClasses={['workspace-container']}>
      {workspaces()}
    </box>
  )
}
