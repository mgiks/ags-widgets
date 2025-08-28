import Hyprland from 'gi://AstalHyprland'
import { Accessor, createBinding, createState } from 'ags'
import { Gtk } from 'ags/gtk4'

const SPECIAL_WORKSPACE = 'special:magic'

const hyprland = Hyprland.get_default()

function CurrentAppPanel() {
  const focusedClient: Accessor<Hyprland.Client | undefined | null> =
    createBinding(
      hyprland,
      'focusedClient',
    )
  const focusedWorkspace = createBinding(hyprland, 'focusedWorkspace')
  const [toolTipText, setToolTipText] = createState('')

  const currentAppTitle = focusedClient.as((focusedClient) => {
    if (!focusedClient) return ' desktop'

    const title = extractTitleFromClient(focusedClient)

    setToolTipText(title)

    return trimTitle(title) +
      (focusedWorkspace.name === SPECIAL_WORKSPACE ? ' S' : '')
  })

  return (
    <box
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['panel']}
      tooltipText={toolTipText}
    >
      <label cssClasses={['red-symbol']} label={'󰣇'} />
      <label
        label={currentAppTitle}
      />
    </box>
  )
}

function extractTitleFromClient(focusedClient: Hyprland.Client) {
  return ' ' + (!focusedClient ? 'desktop' : focusedClient.initialTitle)
}

function trimTitle(title: string) {
  const maxChars = 30
  return title.length > 30 ? title.slice(0, maxChars) + '...' : title
}

export default CurrentAppPanel
