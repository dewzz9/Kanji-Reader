import React, { useState } from 'react';

function PassageReader({ passage, srsCards, onMarkWord, onNextPassage, onPrevPassage, isFirst, isLast }) {
  const [hoveredWord, setHoveredWord] = useState(null);

  if (!passage) return <div>No passage available.</div>;

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.75rem',
      }}>
        <span style={{
          fontSize: '12px',
          color: '#888',
          background: '#f0f0f0',
          padding: '3px 10px',
          borderRadius: '20px',
        }}>
          {passage.level} · {passage.topic}
        </span>
      </div>

      <div style={{
        background: '#fff',
        border: '1px solid #e8e8e8',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1rem',
        lineHeight: '2.8',
        fontSize: '22px',
        letterSpacing: '0.03em',
      }}>
        {passage.segments.map((segment, index) => {
          if (segment.type === 'text') {
            return <span key={index}>{segment.content}</span>;
          }

          const cardKey = `${segment.word}-${segment.reading}`;
          const card = srsCards[cardKey];
          const isUnknown = card && card.unknown;
          const isDue = card && !card.unknown && card.nextReview <= Date.now() + 60000;
          const isSeen = card && !card.unknown;

          let bgColor = 'transparent';
          let borderBottom = 'none';
          if (isUnknown) {
            bgColor = '#fff0ec';
            borderBottom = '2px solid #e05a2b';
          } else if (isDue) {
            bgColor = '#fff8ec';
            borderBottom = '2px solid #e0a02b';
          } else if (isSeen) {
            bgColor = '#f0f8e8';
            borderBottom = '2px solid #5a9e2b';
          }

          return (
            <span
              key={index}
              style={{ position: 'relative', display: 'inline-block' }}
              onMouseEnter={() => setHoveredWord(cardKey + index)}
              onMouseLeave={() => setHoveredWord(null)}
            >
              <span
                onClick={() => onMarkWord(segment)}
                style={{
                  cursor: 'pointer',
                  background: bgColor,
                  borderBottom,
                  padding: '0 2px',
                  borderRadius: '3px',
                  transition: 'background 0.15s',
                }}
              >
                {segment.word}
              </span>

              {hoveredWord === cardKey + index && (
                <span style={{
                  position: 'absolute',
                  bottom: '110%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#2a2a2a',
                  color: '#fff',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  whiteSpace: 'nowrap',
                  zIndex: 100,
                  pointerEvents: 'none',
                }}>
                  {segment.reading} · {segment.meaning}
                  {isUnknown && ' · ✕ unknown'}
                </span>
              )}
            </span>
          );
        })}
      </div>

      <div style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        marginBottom: '1rem',
        flexWrap: 'wrap',
      }}>
        <div style={{ fontSize: '12px', color: '#888', display: 'flex', gap: '12px' }}>
          <span>
            <span style={{
              display: 'inline-block', width: '10px', height: '10px',
              background: '#fff0ec', border: '1px solid #e05a2b', borderRadius: '2px',
              marginRight: '4px',
            }} />
            Tap to mark unknown
          </span>
          <span>
            <span style={{
              display: 'inline-block', width: '10px', height: '10px',
              background: '#fff8ec', border: '1px solid #e0a02b', borderRadius: '2px',
              marginRight: '4px',
            }} />
            Due for review
          </span>
          <span>
            <span style={{
              display: 'inline-block', width: '10px', height: '10px',
              background: '#f0f8e8', border: '1px solid #5a9e2b', borderRadius: '2px',
              marginRight: '4px',
            }} />
            Known
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={onPrevPassage}
          disabled={isFirst}
          style={{
            padding: '10px 20px',
            background: isFirst ? '#f0f0f0' : '#fff',
            color: isFirst ? '#aaa' : '#1a1a1a',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: isFirst ? 'default' : 'pointer',
            fontFamily: 'inherit',
          }}
        >
          ← Previous
        </button>
        <button
          onClick={onNextPassage}
          disabled={isLast}
          style={{
            padding: '10px 24px',
            background: isLast ? '#f0f0f0' : '#1a1a1a',
            color: isLast ? '#aaa' : '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: isLast ? 'default' : 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default PassageReader;