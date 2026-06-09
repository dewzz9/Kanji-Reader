import React, { useState } from 'react';

function FlashCard({ card, onGrade, remaining }) {
  const [showAnswer, setShowAnswer] = useState(false);

  if (!card) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem 0',
        color: '#888',
        fontSize: '14px',
      }}>
        <div style={{ fontSize: '40px', marginBottom: '1rem' }}>🎉</div>
        <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>No cards due right now!</div>
        <div>Keep reading passages to add words to your deck.</div>
      </div>
    );
  }

  const handleGrade = (grade) => {
    setShowAnswer(false);
    onGrade(grade);
  };

  return (
    <div>
      <div style={{
        fontSize: '12px',
        color: '#888',
        marginBottom: '1rem',
        textAlign: 'right',
      }}>
        {remaining} card{remaining !== 1 ? 's' : ''} remaining
      </div>

      <div style={{
        background: '#fff',
        border: '1px solid #e8e8e8',
        borderRadius: '12px',
        padding: '2.5rem',
        textAlign: 'center',
        marginBottom: '1rem',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
      }}>
        <div style={{ fontSize: '52px', fontWeight: '400' }}>
          {card.word}
        </div>
        <div style={{ fontSize: '13px', color: '#aaa' }}>
          Can you read this word?
        </div>

        {showAnswer && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem 2rem',
            background: '#f8f8f8',
            borderRadius: '8px',
            fontSize: '16px',
            color: '#1a1a1a',
          }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>
              {card.reading}
            </div>
            <div style={{ fontSize: '14px', color: '#555' }}>
              {card.meaning}
            </div>
          </div>
        )}
      </div>

      {!showAnswer ? (
        <button
          onClick={() => setShowAnswer(true)}
          style={{
            width: '100%',
            padding: '12px',
            background: '#1a1a1a',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Show reading & meaning
        </button>
      ) : (
        <div>
          <div style={{
            fontSize: '12px',
            color: '#888',
            textAlign: 'center',
            marginBottom: '8px',
          }}>
            How well did you know it?
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
          }}>
            {[
              { grade: 0, label: 'Again', sub: '< 1 min', bg: '#fff0ec', color: '#e05a2b' },
              { grade: 1, label: 'Hard', sub: '~ 6 min', bg: '#fff8ec', color: '#e0a02b' },
              { grade: 2, label: 'Good', sub: `~ ${card.interval ? Math.round(card.interval * 2.5) : 1}d`, bg: '#f0f8e8', color: '#5a9e2b' },
              { grade: 3, label: 'Easy', sub: `~ ${card.interval ? Math.round(card.interval * 3.5) : 4}d`, bg: '#eef4ff', color: '#2b5ee0' },
            ].map(({ grade, label, sub, bg, color }) => (
              <button
                key={grade}
                onClick={() => handleGrade(grade)}
                style={{
                  padding: '10px 8px',
                  background: bg,
                  color,
                  border: `1px solid ${color}40`,
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  textAlign: 'center',
                }}
              >
                {label}
                <span style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: '400',
                  marginTop: '2px',
                  opacity: 0.8,
                }}>
                  {sub}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FlashCard;