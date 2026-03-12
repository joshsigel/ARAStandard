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

/**
 * ExampleBanner — a small notice bar placed at the top of a directory page
 * to explain that all entries are illustrative examples.
 */
export function ExampleBanner() {
  return (
    <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      <strong className="font-semibold">Note:</strong> All entries shown below
      are illustrative examples created for demonstration purposes. They do not
      represent real organizations or certifications.
    </div>
  );
}
