export function Mark() {
  return (
    <svg viewBox="0 0 46 34" aria-hidden="true" fill="currentColor">
      <path d="M1 23 44 2 28 32 21 23 37 8 17 21Z" />
      <path d="m16 23 3 8 2-6z" />
    </svg>
  );
}
export function Brand() {
  return (
    <a className="brand" href="#ground" aria-label="Tech Over Sky home">
      <Mark />
      <span>Tech Over Sky</span>
    </a>
  );
}
