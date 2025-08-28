import { createBinding, createComputed, For } from 'ags'
import { Gtk } from 'ags/gtk4'
import Hyprland from 'gi://AstalHyprland'

const hyprland = Hyprland.get_default()

function WorkspacesPanel() {
  function range(max: number) {
    return [...Array(max).keys()]
  }

  const workspaces = createComputed(
    [
      createBinding(hyprland, 'focusedWorkspace'),
      createBinding(hyprland, 'clients'),
      createBinding(hyprland, 'focusedClient'),
    ],
    () => {
      return range(10).map((i) => (Workspace({ workspace: { id: i + 1 } })))
    },
  )

  return (
    <box
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['panel', 'workspaces-panel']}
    >
      <For each={workspaces}>{(workspace) => workspace}</For>
    </box>
  )
}

type WorkspaceType = { workspace: { id: number } }

function Workspace({ workspace }: WorkspaceType) {
  let cssClasses = ['workspaces-panel__workspace']

  const isOccupied =
    hyprland.get_workspace(workspace.id)?.get_clients().length > 0
  isOccupied && cssClasses.push('workspaces-panel__workspace_occupied')

  const isFocused = hyprland.focusedWorkspace.id == workspace.id
  isFocused && cssClasses.push('workspaces-panel__workspace_focused')

  return (
    <box
      visible={isFocused || isOccupied}
      cssClasses={cssClasses}
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
    >
      <Gtk.GestureClick
        onPressed={() => hyprland.workspaces.at(workspace.id)?.focus()}
      />

      <label label={workspace.id.toString().slice(-1)} />
    </box>
  )
}

export default WorkspacesPanel
