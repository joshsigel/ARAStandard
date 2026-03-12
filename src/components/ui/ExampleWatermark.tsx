/**
 * ExampleWatermark — a diagonal "EXAMPLE" overlay for cards containing
 * fabricated / placeholder data. Designed to be placed inside a container
 * that has `position: relative` and `overflow: hidden`.
 *
 * Usage:
 *   <div className="relative overflow-hidden ...">
 *     <ExampleWatermark />
 *     {/* card content *\/}
 *   </div>
 */
export function ExampleWatermark() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center select-none z-10"
    >
      <span className="-rotate-18 text-[2rem] font-bold tracking-[0.25em] uppercase text-slate-300/50 whitespace-nowrap">
        Example
      </span>
    </span>
  );
}