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
      createBinding(hyprland.focusedClient, 'workspace'),
    ],
    () => {
      return range(10).map((
        i,
      ) => (Workspace({ workspace: Hyprland.Workspace.dummy(i + 1, null) })))
    },
  )

  return (
    <box
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['panel', 'workspaces-panel']}
    >
      <For each={workspaces}>
        {(workspace) => workspace}
      </For>
    </box>
  )
}

type WorkspaceType = {
  workspace: Hyprland.Workspace
}

function Workspace({ workspace }: WorkspaceType) {
  let cssClasses = ['workspaces-panel__workspace']

  const isOccupied = hyprland.get_workspace(workspace.id)?.get_clients().length
  isOccupied && cssClasses.push('workspaces-panel__workspace_occupied')

  const isFocused = hyprland.focusedWorkspace.id == workspace.id
  isFocused && cssClasses.push('workspaces-panel__workspace_focused')

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
    >
      <Gtk.GestureClick onPressed={() => workspace.focus()} />

      <label label={workspace.id.toString().slice(-1)} />
    </box>
  )
}

export default WorkspacesPanel
