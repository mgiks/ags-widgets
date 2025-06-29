import { createState, For } from 'ags'
import { Gtk } from 'ags/gtk4'
import Cava from 'gi://AstalCava'

const MONITOR_REFRESH_RATE = 120

function MusicVisualizer() {
  const cava = Cava.get_default()
  const [barHeights, setBarHeight] = createState<number[]>([])
  const [isMusicPlaying, setIsMusicPlaying] = createState(false)

  if (cava) {
    cava.set_framerate(MONITOR_REFRESH_RATE)
    cava.connect('notify::values', () => {
      const minSoundVal = Math.min(...cava.get_values())

      setIsMusicPlaying(minSoundVal > 1e-10)

      setBarHeight(cava.get_values())
    })
  }

  return (
    <Gtk.Revealer
      revealChild={isMusicPlaying}
      transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
      transitionDuration={150}
    >
      <Gtk.Box cssClasses={['panel', 'music-visualizer-panel']}>
        <For each={barHeights}>
          {(height, _) => (
            <Gtk.LevelBar
              cssClasses={['music-visualizer-panel__bar']}
              value={height}
              orientation={Gtk.Orientation.VERTICAL}
              widthRequest={3}
              inverted
            />
          )}
        </For>
      </Gtk.Box>
    </Gtk.Revealer>
  )
}

export default MusicVisualizer
