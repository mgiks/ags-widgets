import { createBinding, createComputed } from 'ags'
import { Gtk } from 'ags/gtk4'
import Hyprland from 'gi://AstalHyprland'

const hyprland = Hyprland.get_default()

function WorkspacesPanel() {
  function range(max: number) {
    return [...Array(max).keys()]
  }

  return (
    <box
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['panel', 'workspaces-panel']}
    >
      {range(10).map((i) => (
        <Workspace workspace={Hyprland.Workspace.dummy(i + 1, null)} />
      ))}
    </box>
  )
}

type WorkspaceType = {
  workspace: Hyprland.Workspace
}

function Workspace({ workspace }: WorkspaceType) {
  const focusedWorkspace = createBinding(hyprland, 'focusedWorkspace')
  const clients = createBinding(hyprland, 'clients')

  const isOccupied = clients((clients) =>
    clients.filter((client) => client.workspace.id == workspace.id).length > 0
  )

  const isFocused = focusedWorkspace((focusedWorkspace) => {
    const isFocused = focusedWorkspace.id == workspace.id
    return isFocused
  })

  const isVisible = createComputed([
    isFocused,
    isOccupied,
  ], (focused, occupied) => focused || occupied)

  const cssClasses = createComputed([
    isFocused,
    isOccupied,
  ], (focused, occupied) => {
    const classes = ['workspaces-panel__workspace']

    focused && classes.push('workspaces-panel__workspace_focused')
    occupied && classes.push('workspaces-panel__workspace_occupied')

    return classes
  })

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
