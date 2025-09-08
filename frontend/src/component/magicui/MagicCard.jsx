export const MagicCard = ({
  children,
  className = "",
  gradientSize = 200,
  gradientFrom = "#7C3AED",
  gradientTo = "#D946EF",
  gradientColor = "rgba(255, 255, 255, 0.07)",
}) => {
  return (
    <div
      className={`relative rounded-2xl border overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        WebkitMaskImage: `radial-gradient(${gradientSize}px circle, ${gradientColor} 0%, transparent 100%)`,
        maskImage: `radial-gradient(${gradientSize}px circle, ${gradientColor} 0%, transparent 100%)`,
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};
