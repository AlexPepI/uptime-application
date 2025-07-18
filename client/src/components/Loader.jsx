
export function Loader({ size = 48, color = '#1e90ff' }) {
  const borderSize = size * 0.13; // roughly Mantine proportions

  const style = {
    width: size,
    height: size,
    border: `${borderSize}px solid rgba(0,0,0,0.1)`,
    borderTopColor: color,
    borderRadius: '50%',
    animation: 'spin 0.8s ease infinite',
  };

  return (
    <>
      <div style={style} role="status" aria-label="Loading…" />
      <style>
        {`@keyframes spin { to { transform: rotate(360deg); } }`}
      </style>
    </>
  );
}
