// Project icons - single source of truth for React components
// Icon path definitions extracted from SVG files
// Using React-compatible attribute names (camelCase)

export const iconPaths = {
  transfer: {
    viewBox: "0 0 48 48",
    elements: [
      { type: 'circle', props: { cx: 24, cy: 24, r: 20, strokeWidth: 2.5, strokeDasharray: "4 3", opacity: 0.4 }},
      { type: 'path', props: { d: "M16 18L24 10L32 18", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" }},
      { type: 'path', props: { d: "M24 10V28", strokeWidth: 2.5, strokeLinecap: "round" }},
      { type: 'path', props: { d: "M32 30L24 38L16 30", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" }},
      { type: 'path', props: { d: "M24 38V20", strokeWidth: 2.5, strokeLinecap: "round" }},
    ]
  },
  deploy: {
    viewBox: "0 0 48 48",
    elements: [
      { type: 'circle', props: { cx: 24, cy: 24, r: 20, strokeWidth: 2.5, strokeDasharray: "4 3", opacity: 0.4 }},
      { type: 'path', props: { d: "M38 18L24 10L10 18V32L24 40V26", strokeWidth: 2.5, strokeLinejoin: "round" }},
      { type: 'path', props: { d: "M24 26L38 18V32L24 40", strokeWidth: 2.5, strokeLinejoin: "round" }},
      { type: 'path', props: { d: "M10 18L24 26L38 18", strokeWidth: 2.5, strokeLinejoin: "round" }},
    ]
  },
  whisper: {
    viewBox: "0 0 48 48",
    elements: [
      { type: 'circle', props: { cx: 24, cy: 24, r: 20, strokeWidth: 2.5, strokeDasharray: "4 3", opacity: 0.4 }},
      { type: 'circle', props: { cx: 16, cy: 24, r: 5, strokeWidth: 2.5 }},
      { type: 'path', props: { d: "M24 17a10 10 0 0 1 0 14", strokeWidth: 2.5, strokeLinecap: "round" }},
      { type: 'path', props: { d: "M30 13a16 16 0 0 1 0 22", strokeWidth: 2.5, strokeLinecap: "round", opacity: 0.7 }},
    ]
  },
  document: {
    viewBox: "0 0 48 48",
    elements: [
      { type: 'circle', props: { cx: 24, cy: 24, r: 20, strokeWidth: 2.5, strokeDasharray: "4 3", opacity: 0.4 }},
      { type: 'rect', props: { x: 16, y: 12, width: 16, height: 24, rx: 2, strokeWidth: 2.5 }},
      { type: 'line', props: { x1: 20, y1: 18, x2: 28, y2: 18, strokeWidth: 2 }},
      { type: 'line', props: { x1: 20, y1: 24, x2: 28, y2: 24, strokeWidth: 2 }},
      { type: 'line', props: { x1: 20, y1: 30, x2: 25, y2: 30, strokeWidth: 2 }},
    ]
  },
};

export const projectToIcon = {
  'AirGap Transfer': 'transfer',
  'AirGap Deploy': 'deploy',
  'Cleanroom Whisper': 'whisper',
};

// Chevron paths for navigation arrows
export const chevronPaths = {
  down: { d: "M19 9l-7 7-7-7" },
  right: { d: "M9 5l7 7-7 7" },
};

// Dashed circle presets used in Hero decorations
export const dashedCirclePresets = {
  large: { r: 40, strokeWidth: 1, strokeDasharray: "4 4" },
  medium: { r: 40, strokeWidth: 1, strokeDasharray: "6 6" },
  small: { r: 35, strokeWidth: 1, strokeDasharray: "3 5" },
  extraLarge: { r: 45, strokeWidth: 0.8, strokeDasharray: "2 4" },
};
