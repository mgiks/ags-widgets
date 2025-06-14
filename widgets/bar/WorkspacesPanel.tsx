import { bind, Variable } from 'astal'
import { Gtk } from 'astal/gtk4'
import Hyprland from 'gi://AstalHyprland'
import { wrapWithRevealer } from './utils/wrapWithRevealer'

type WorkspaceType = {
  workspace: Hyprland.Workspace
}

const hyprland = Hyprland.get_default()

function Workspace({ workspace }: WorkspaceType) {
  let cssClasses = ['workspace']

  const isOccupied = hyprland.get_workspace(workspace.id)?.get_clients().length
  isOccupied && cssClasses.push('occupied-workspace')

  const isFocused = hyprland.focusedWorkspace.id == workspace.id
  isFocused && cssClasses.push('focused-workspace')

  let isVisible = false

  if (isOccupied || isFocused) {
    isVisible = true
  }

  return (
    <box
      visible={isVisible}
      cssClasses={cssClasses}
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      onButtonReleased={() => workspace.focus()}
    >
      <label>
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
      return range(10).map((
        i,
      ) => (Workspace({ workspace: Hyprland.Workspace.dummy(i + 1, null) })))
    },
  )

  return (
    <box cssClasses={['container', 'workspace-container']}>
      {workspaces()}
    </box>
  )
}
