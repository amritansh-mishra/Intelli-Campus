export function Loader({ text }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-primary" />
      {text && <p className="text-sm text-muted">{text}</p>}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="app-card animate-pulse p-5">
      <div className="mb-4 h-5 w-2/3 rounded bg-line" />
      <div className="mb-2 h-4 w-full rounded bg-line" />
      <div className="h-4 w-3/4 rounded bg-line" />
    </div>
  );
}
