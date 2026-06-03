import { IntroScene } from '@/components/scenes/IntroScene'
import { SandbarScene } from '@/components/scenes/SandbarScene'
import { BeliefAgentScene } from '@/components/scenes/BeliefAgentScene'
import { WhiteHelmetScene } from '@/components/scenes/WhiteHelmetScene'
import { ReadingTheBreakScene } from '@/components/scenes/ReadingTheBreakScene'
import { Footer } from '@/components/ui/Footer'

export default function Home() {
  return (
    <main id="main-content">
      <IntroScene />
      <SandbarScene />
      <BeliefAgentScene />
      <WhiteHelmetScene />
      <ReadingTheBreakScene />
      <Footer />
    </main>
  )
}
