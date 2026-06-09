import React, { useState } from 'react';
import PassageReader from './PassageReader';

function LevelScreen({ level, passages, srsCards, onMarkWord, onBack }) {
  const [passageIndex, setPassageIndex] = useState(0);

  const currentPassage = passages[passageIndex];
  const total = passages.length;

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '1.5rem',
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '13px',
            color: '#555',
            fontFamily: 'inherit',
          }}
        >
          ← Back
        </button>
        <div>
          <span style={{ fontWeight: '600', fontSize: '16px' }}>{level}</span>
          <span style={{ fontSize: '13px', color: '#888', marginLeft: '8px' }}>
            Passage {passageIndex + 1} of {total}
          </span>
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '4px',
        marginBottom: '1.5rem',
      }}>
        {passages.map((_, i) => (
          <div
            key={i}
            onClick={() => setPassageIndex(i)}
            style={{
              flex: 1,
              height: '4px',
              borderRadius: '2px',
              background: i === passageIndex ? '#1a1a1a' : '#e0e0e0',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>

      <PassageReader
        passage={currentPassage}
        srsCards={srsCards}
        onMarkWord={onMarkWord}
        onNextPassage={() => {
          if (passageIndex < total - 1) {
            setPassageIndex(passageIndex + 1);
          }
        }}
        onPrevPassage={() => {
          if (passageIndex > 0) {
            setPassageIndex(passageIndex - 1);
          }
        }}
        isFirst={passageIndex === 0}
        isLast={passageIndex === total - 1}
      />
    </div>
  );
}

export default LevelScreen;