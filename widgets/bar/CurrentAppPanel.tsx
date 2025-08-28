import Hyprland from 'gi://AstalHyprland'
import { createState } from 'ags'
import { createPoll } from 'ags/time'
import { Gtk } from 'ags/gtk4'

const hyprland = Hyprland.get_default()
const [isOnSpecialWorkspace, setIsOnSpecialWorkspace] = createState(false)

function CurrentAppPanel() {
  const [toolTipText, setToolTipText] = createState('')
  const currentAppTitle = createPoll('', 8, () => {
    setIsOnSpecialWorkspace(false)
    const focusedClient = hyprland.focusedClient
    const title = extractTitleFromClient(focusedClient)
    if (focusedClient?.workspace.name == 'special:magic') {
      setIsOnSpecialWorkspace(true)
    }

    setToolTipText(title)
    return trimTitle(title)
  })

  return (
    <box
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['panel']}
      tooltipText={toolTipText}
    >
      <label cssClasses={['red-symbol']} label={'󰣇'} />
      <label label={currentAppTitle} />
      {isOnSpecialWorkspace.get() && <label label={' S'} />}
    </box>
  )
}

function extractTitleFromClient(focusedClient: Hyprland.Client) {
  if (!focusedClient) return ' desktop'

  let focusedClientTitle = focusedClient.initialTitle

  return ' ' + focusedClientTitle
}

function trimTitle(title: string) {
  const maxChars = 30
  return title.length > 30 ? title.slice(0, maxChars) + '...' : title
}

export default CurrentAppPanel
