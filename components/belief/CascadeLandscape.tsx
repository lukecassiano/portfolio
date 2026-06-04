import { LossSurface3D } from './LossSurface3D'
import { LossContour } from './LossContour'

/**
 * Belief as gradient descent over a loss landscape, shown two ways:
 * an interactive 3-D surface and a top-down contour map. The descent rolls
 * into a deep "wrong attractor" — the misinformation cascade made geometric.
 */
export function CascadeLandscape() {
  return (
    <figure className="my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-5 items-center">
        <LossSurface3D />
        <LossContour />
      </div>
      <figcaption className="font-mono font-medium text-xs tracking-[0.04em] mt-5 text-cream/55">
        BELIEF AS GRADIENT DESCENT — HARD CONSTRAINTS DEEPEN A WRONG-ATTRACTOR BASIN, AND CASCADING COMMS ROLL BOTH AGENTS INTO IT
      </figcaption>
    </figure>
  )
}
