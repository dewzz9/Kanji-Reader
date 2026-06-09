import React from 'react';
import { isMastered } from '../utils/srs';

function Progress({ srsCards, passageIndex, onReset }) {
  const allCards = Object.values(srsCards);
  const now = Date.now();

  const totalSeen = allCards.length;
  const totalDue = allCards.filter(c => c.nextReview <= now + 60000).length;
  const totalMastered = allCards.filter(c => isMastered(c)).length;
  const totalUnknown = allCards.filter(c => c.unknown).length;

  const n5Cards = allCards.filter(c => c.level === 'N5');
  const n4Cards = allCards.filter(c => c.level === 'N4');
  const n3Cards = allCards.filter(c => c.level === 'N3');
  const n2Cards = allCards.filter(c => c.level === 'N2');

  const masteredPct = (cards) => {
    if (cards.length === 0) return 0;
    return Math.round(cards.filter(c => isMastered(c)).length / cards.length * 100);
  };

  const ProgressBar = ({ pct, color }) => (
    <div style={{
      height: '8px',
      background: '#f0f0f0',
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: '4px',
    }}>
      <div style={{
        height: '100%',
        width: `${pct}%`,
        background: color,
        borderRadius: '4px',
        transition: 'width 0.5s ease',
      }} />
    </div>
  );

  const StatCard = ({ label, value, color }) => (
    <div style={{
      background: '#fff',
      border: '1px solid #e8e8e8',
      borderRadius: '10px',
      padding: '12px',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: '28px',
        fontWeight: '500',
        color: color || '#1a1a1a',
      }}>
        {value}
      </div>
      <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
        {label}
      </div>
    </div>
  );

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px',
        marginBottom: '1.5rem',
      }}>
        <StatCard label="Words seen" value={totalSeen} />
        <StatCard label="Unknown" value={totalUnknown} color="#e05a2b" />
        <StatCard label="Due today" value={totalDue} color="#e0a02b" />
        <StatCard label="Mastered" value={totalMastered} color="#5a9e2b" />
      </div>

      <div style={{
        background: '#fff',
        border: '1px solid #e8e8e8',
        borderRadius: '12px',
        padding: '1.25rem',
        marginBottom: '1rem',
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '1rem',
        }}>
          JLPT Level Progress
        </div>

        {[
          { label: 'N5', cards: n5Cards, color: '#5a9e2b', total: 100 },
          { label: 'N4', cards: n4Cards, color: '#2b7ee0', total: 200 },
          { label: 'N3', cards: n3Cards, color: '#e0a02b', total: 370 },
          { label: 'N2', cards: n2Cards, color: '#e05a2b', total: 370 },
        ].map(({ label, cards, color, total }) => (
          <div key={label} style={{ marginBottom: '12px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '13px',
              marginBottom: '4px',
            }}>
              <span style={{ fontWeight: '500' }}>{label}</span>
              <span style={{ color: '#888' }}>
                {cards.filter(c => isMastered(c)).length} / {total} mastered
              </span>
            </div>
            <ProgressBar pct={masteredPct(cards)} color={color} />
          </div>
        ))}
      </div>

      <div style={{
        background: '#fff',
        border: '1px solid #e8e8e8',
        borderRadius: '12px',
        padding: '1.25rem',
        marginBottom: '1rem',
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '0.75rem',
        }}>
          5-Month N2 Plan
        </div>
        <div style={{
          fontSize: '13px',
          color: '#555',
          lineHeight: '2',
        }}>
          <div>📅 Month 1–2: N5 + N4 kanji (~300)</div>
          <div>📅 Month 2–3: N3 kanji (~370 new)</div>
          <div>📅 Month 3–4: N2 kanji (~370 new)</div>
          <div>📅 Month 4–5: Full review + passages</div>
          <div style={{ marginTop: '8px', color: '#aaa', fontSize: '12px' }}>
            Target: 15 new kanji/day · 20min reading
          </div>
        </div>
      </div>

      <div style={{
        fontSize: '13px',
        color: '#888',
        marginBottom: '8px',
      }}>
        Passages completed: {passageIndex}
      </div>

      <button
        onClick={() => {
          if (window.confirm('Reset all progress? This cannot be undone.')) {
            onReset();
          }
        }}
        style={{
          width: '100%',
          padding: '10px',
          background: '#fff0ec',
          color: '#e05a2b',
          border: '1px solid #e05a2b40',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        Reset all progress
      </button>
    </div>
  );
}

export default Progress;