export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#070512]"
    >
      {/* Subtle architectural perspective grid */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(139, 92, 246, 0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.12) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 25%, #000 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 25%, #000 40%, transparent 100%)',
        }}
      />

      {/* Deep royal purple primary glow (GPU-composited) */}
      <div
        className="animate-aurora-primary absolute -top-48 -left-40 h-[38rem] w-[38rem] rounded-full blur-[120px]"
        style={{
          background:
            'radial-gradient(circle at center, rgba(109, 40, 217, 0.45) 0%, rgba(76, 29, 149, 0.18) 55%, transparent 75%)',
        }}
      />

      {/* Electric blue secondary glow (GPU-composited) */}
      <div
        className="animate-aurora-secondary absolute top-1/4 -right-40 h-[42rem] w-[42rem] rounded-full blur-[130px]"
        style={{
          background:
            'radial-gradient(circle at center, rgba(37, 99, 235, 0.36) 0%, rgba(59, 130, 246, 0.14) 52%, transparent 75%)',
        }}
      />

      {/* Lower ambient violet-blue wash */}
      <div
        className="animate-aurora-primary absolute -bottom-48 left-1/3 h-[34rem] w-[44rem] rounded-full blur-[135px]"
        style={{
          background:
            'radial-gradient(circle at center, rgba(91, 33, 182, 0.28) 0%, rgba(29, 78, 216, 0.16) 50%, transparent 75%)',
        }}
      />
    </div>
  );
}
