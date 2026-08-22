import type { CountDatum } from '../../data/selectors';

export function RankedBars({ data, label, limit = 7 }: { data: CountDatum[]; label: string; limit?: number }) {
  const visible = data.slice(0, limit);
  const maximum = Math.max(...visible.map((item) => item.count), 1);

  if (!visible.length) return <p className="empty-copy">No data recorded</p>;

  return (
    <figure className="ranked-bars" aria-label={label}>
      <ol>
        {visible.map((item) => (
          <li key={item.label}>
            <div className="bar-label"><span>{item.label}</span><strong>{item.count}</strong></div>
            <div className="bar-track" aria-hidden="true"><i style={{ width: `${(item.count / maximum) * 100}%` }} /></div>
          </li>
        ))}
      </ol>
      <figcaption>{label}. Values are direct counts from the current public dataset.</figcaption>
    </figure>
  );
}
