import { IntroScene } from '@/components/scenes/IntroScene'
import { ProjectCard } from '@/components/work/ProjectCard'
import { FlowingContours } from '@/components/belief/FlowingContours'
import { Nav } from '@/components/ui/Nav'
import { Footer } from '@/components/ui/Footer'

export default function Home() {
  return (
    <main id="main-content">
      <div className="relative">
        <Nav />
        <IntroScene />
      </div>

      <section
        id="work"
        aria-label="Selected Work"
        className="px-6 pt-16 pb-28 md:px-10 md:pt-28 md:pb-40"
      >
        <div className="mx-auto max-w-5xl">
          {/* Section intro */}
          <header className="mb-12 md:mb-16 flex flex-col gap-4">
            <p className="font-mono font-medium text-xs uppercase tracking-[0.22em] text-ink/50">
              Selected Work
            </p>
            <p
              className="font-mono font-medium leading-snug max-w-2xl text-ink/90"
              style={{ fontSize: 'clamp(18px, 2.4vw, 28px)' }}
            >
              Products, a research project, and a writing series — each about turning
              ambiguous signal and noise into something you can actually act on.
            </p>
          </header>

          <div className="flex flex-col gap-6 md:gap-8">
            <ProjectCard
              index="01"
              category="Product"
              status="Live · Beta"
              title="Sandbar"
              titleClassName="wordmark-serif lowercase"
              titleSize="clamp(40px, 5.9vw, 70px)"
              tagline="Surf forecasting that tells you when to paddle out — not just what the conditions are."
              body={[
                'Tools like Surfline dump raw swell, wind, and tide data and leave you to interpret it. Sandbar predicts surf-quality windows for a specific break, collapsing that data into a simple timeline — fair, good, best, declining — plus board-aware recommendations tuned to what you actually ride.',
                'It ingests live buoy observations and NOAA grid forecasts, scores them against how a break behaves under given conditions, and answers the only question that matters: when should I go?',
              ]}
              specs={[
                { label: 'Role', value: 'Solo — product, ML, design' },
                { label: 'Focus', value: 'Surf-window prediction, board-aware scoring' },
                { label: 'Stack', value: 'Python · forecast ingestion · ensemble scoring' },
                { label: 'Status', value: 'Private beta' },
              ]}
              links={[
                { label: 'Live demo', href: 'https://sandbar-ai-production.up.railway.app/', external: true },
                { label: 'Case study', href: '/sandbar' },
              ]}
              blob={{
                colors: ['#F4A8C7', '#C4B5FD', '#93C5FD'],
                position: { top: '-30%', right: '-10%' },
                blur: '70px',
                duration: 15,
              }}
            />

            <ProjectCard
              index="02"
              category="Research"
              status="Open source"
              title="Belief Agent"
              tagline="A multi-agent system that reasons under uncertainty — and learns when not to trust what it's told."
              tone="dark"
              align="right"
              backdrop={<FlowingContours />}
              body={[
                'Two Bayesian agents — a Sensor agent and a Language agent — each hold an explicit belief distribution over the world, track their own entropy, and exchange precision-weighted messages instead of raw answers.',
                "The core finding: when two information sources differ in reliability, unidirectional, precision-weighted communication beats symmetric fusion. Letting the weaker agent listen to the stronger one — but not the reverse — prevents the belief collapse and misinformation cascades that naive message-passing creates under noise.",
              ]}
              specs={[
                { label: 'Role', value: 'Solo — research + implementation' },
                { label: 'Focus', value: 'Bayesian inference, entropy gating, precision-weighted comms' },
                { label: 'Stack', value: 'Python · NumPy · Streamlit' },
                { label: 'Status', value: 'Live demo + open source' },
              ]}
              links={[
                { label: 'Live demo', href: 'https://belief-agent.streamlit.app/', external: true },
                { label: 'Case study', href: '/belief-agent' },
                { label: 'GitHub', href: 'https://github.com/lukecassiano/belief-agent', external: true },
              ]}
              blob={{
                colors: ['#312E81', '#4ADE80'],
                position: { top: '-20%', left: '-15%' },
                blur: '90px',
                duration: 18,
              }}
            />

            <ProjectCard
              index="03"
              category="Product · Mobile"
              status="MVP · WIP"
              title="lineup."
              titleClassName="wordmark-bagel"
              titleStyle={{ color: '#c54f2d' }}
              titleSize="clamp(32px, 4.6vw, 54px)"
              tagline="Strava for surfing — a private journal and crew layer for the sessions, secret spots, and clips you only share with the people you actually surf with."
              body={[
                'Surfers already trade spots, sessions, and clips over iMessage and Instagram — the wrong tools for the job. Coordinates get buried in a thread; a public post broadcasts your home reef to forty thousand strangers. Lineup is the missing middle: a place for a crew of four-to-eight friends to share real intel without it being a chat blob or a public broadcast.',
                "Every session log, dropped pin, and clip runs through one decision — private, crew, or community — with the crew tier as the center of gravity. Structured logs, a map that fills in as you collect spots, and lightweight personal streaks. Pointedly not a forecast tool: Lineup records what happened; Sandbar predicts what's coming. Today it's a working MVP on the web, headed for the iOS App Store.",
              ]}
              specs={[
                { label: 'Role', value: 'Solo — product, design, build' },
                { label: 'Focus', value: 'Private crews · session journal · spot map' },
                { label: 'Model', value: 'Three privacy tiers — private / crew / community' },
                { label: 'Status', value: 'MVP — web prototype live; iOS App Store next' },
              ]}
              links={[
                { label: 'Live demo', href: 'https://lineup-app.up.railway.app/dashboard', external: true },
                { label: 'Case study', href: '/lineup' },
              ]}
              blob={{
                colors: ['#f2e0c4', '#d9a847', '#c54f2d', '#e6336d'],
                position: { top: '-26%', right: '-12%' },
                blur: '75px',
                duration: 16,
              }}
            />

            <ProjectCard
              index="04"
              category="Product · Team"
              status="Contract"
              title="WhiteHelmet"
              tagline="AI that turns a mess of subcontractor spreadsheets into one master report you can trust."
              tone="dark"
              align="right"
              body={[
                'Built with a Product Space team for WhiteHelmet, a construction-intelligence platform. Project managers lose hours reconciling inconsistent subcontractor files into a single source of truth. The product, Salama, ingests heterogeneous sheets and consolidates them into one structured master dataset.',
                'I owned AI consolidation and master-template generation: parsing arbitrary Excel templates into a managed master sheet, and using an LLM as a compiler that turns plain-language commands into structured spreadsheet operations — mapping intent to functions, never editing the source data directly.',
              ]}
              specs={[
                { label: 'Role', value: 'AI consolidation + master-template generation' },
                { label: 'Team', value: 'Product Space × WhiteHelmet' },
                { label: 'Focus', value: 'Schema unification · NL→operations · template parsing' },
                { label: 'Stack', value: 'Python · Claude · spreadsheet engine' },
              ]}
              links={[{ label: 'Case study', href: '/whitehelmet' }]}
              logo={{ src: '/whitehelmet-icon.svg' }}
              blob={{
                colors: ['#2A2A30', '#3A3A42', '#4A4A52'],
                position: { bottom: '-30%', right: '-10%' },
                blur: '80px',
                duration: 17,
              }}
            />

            <ProjectCard
              index="05"
              category="Writing"
              status="Substack"
              title="Reading the Break"
              titleClassName="wordmark-serif-book"
              tagline="On learning to read what the world doesn't spell out."
              body={[
                'Not live yet. When it launches, it’s where the threads pull together — where computer science, neuroscience, cognitive science, physics, and philosophy of mind meet and complete one another, with jazz, surfing, and machine learning in the same frame. One structure runs through them all: turning uncertainty into something legible, holding rigor and feel as one operation. Launching soon.',
              ]}
              essays={[
                'Physics × neuroscience',
                'Cognitive science',
                'Philosophy of mind',
                'Music & improvisation',
                'Machine learning',
              ]}
              essaysLabel="Themes"
              links={[]}
              blob={{
                colors: ['#F97316', '#F59E0B'],
                position: { top: '-25%', left: '10%' },
                blur: '70px',
                duration: 14,
              }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
