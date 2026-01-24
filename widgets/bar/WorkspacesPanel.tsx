import { createBinding, createComputed, createState, For } from 'ags'
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
    () => range(10).map((i) => (Workspace(i + 1))),
  )

  const [plusButtonVisibility, setPlusButtonVisibility] = createState(false)

  return (
    <box
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['panel', 'workspaces-panel']}
    >
      <Gtk.EventControllerMotion
        onEnter={() => setPlusButtonVisibility(true)}
        onLeave={() => setPlusButtonVisibility(false)}
      />
      {
        /* The <box> around the <For> is necessary to prevent the <For> children
        from being appended at the right of the container, and thus making
        the plus button appear on the left.
        */
      }
      <box>
        <For each={workspaces}>{(workspace) => workspace.element}</For>
      </box>
      <button
        onClicked={() => {
          const newWorkspaceId = workspaces((workspaces) =>
            workspaces.findLast((workspace) => workspace.isOccupied)
          ).as((workspace) => (workspace!.id + 1).toString())
          const app = 'ghostty'

          hyprland.dispatch('workspace', newWorkspaceId.get())
          hyprland.dispatch('exec', app)
        }}
        cssClasses={['workspaces-panel__add-workspace-button']}
        visible={plusButtonVisibility}
      >
        +
      </button>
    </box>
  )
}

function Workspace(id: number) {
  let cssClasses = ['workspaces-panel__workspace']

  const isOccupied = hyprland.get_workspace(id)?.get_clients().length > 0
  isOccupied && cssClasses.push('workspaces-panel__workspace_occupied')

  const isFocused = hyprland.focusedWorkspace.id == id
  isFocused && cssClasses.push('workspaces-panel__workspace_focused')

  return {
    id,
    isOccupied,
    isFocused,
    element: (
      <button
        visible={isFocused || isOccupied}
        cssClasses={cssClasses}
        valign={Gtk.Align.CENTER}
        halign={Gtk.Align.CENTER}
      >
        <Gtk.GestureClick
          onEnd={() => hyprland.get_workspace(id)?.focus()}
        />
        <label label={id.toString().slice(-1)} />
      </button>
    ),
  }
}

export default WorkspacesPanel
