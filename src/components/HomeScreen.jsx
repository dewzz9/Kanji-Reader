import React from 'react';

const LEVEL_INFO = [
  {
    level: 'N5',
    kanji: '~100 kanji',
    passages: 25,
    color: '#5a9e2b',
    bg: '#f0f8e8',
    border: '#5a9e2b40',
    description: 'Basic kanji for beginners',
  },
  {
    level: 'N4',
    kanji: '~200 kanji',
    passages: 0,
    color: '#2b7ee0',
    bg: '#eef4ff',
    border: '#2b7ee040',
    description: 'Elementary kanji',
  },
  {
    level: 'N3',
    kanji: '~370 kanji',
    passages: 0,
    color: '#e0a02b',
    bg: '#fff8ec',
    border: '#e0a02b40',
    description: 'Intermediate kanji',
  },
  {
    level: 'N2',
    kanji: '~370 kanji',
    passages: 0,
    color: '#e05a2b',
    bg: '#fff0ec',
    border: '#e05a2b40',
    description: 'Upper intermediate kanji',
  },
];

function HomeScreen({ onSelectLevel, srsCards }) {
  const getStats = (level) => {
    const cards = Object.values(srsCards).filter(c => c.level === level);
    const mastered = cards.filter(c => c.interval >= 21).length;
    return { total: cards.length, mastered };
  };

  return (
    <div>
      <div style={{
        marginBottom: '1.5rem',
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
          レベルを選んでください
        </h2>
        <p style={{ fontSize: '13px', color: '#888' }}>
          Choose a level to start reading
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {LEVEL_INFO.map(({ level, kanji, passages, color, bg, border, description }) => {
          const { total, mastered } = getStats(level);
          const isAvailable = passages > 0;

          return (
            <div
              key={level}
              onClick={() => isAvailable && onSelectLevel(level)}
              style={{
                background: isAvailable ? bg : '#f7f7f7',
                border: `1px solid ${isAvailable ? border : '#e0e0e0'}`,
                borderRadius: '12px',
                padding: '1.25rem',
                cursor: isAvailable ? 'pointer' : 'default',
                opacity: isAvailable ? 1 : 0.5,
                transition: 'transform 0.1s, box-shadow 0.1s',
              }}
              onMouseEnter={e => {
                if (isAvailable) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: isAvailable ? color : '#aaa',
                    }}>
                      {level}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      color: isAvailable ? color : '#aaa',
                      background: '#fff',
                      padding: '2px 8px',
                      borderRadius: '20px',
                      border: `1px solid ${isAvailable ? border : '#e0e0e0'}`,
                    }}>
                      {kanji}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                    {description}
                  </div>
                  <div style={{ fontSize: '12px', color: '#aaa' }}>
                    {isAvailable
                      ? `${passages} passages available`
                      : 'Coming soon'}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  {total > 0 && (
                    <>
                      <div style={{ fontSize: '22px', fontWeight: '500', color }}>
                        {mastered}
                      </div>
                      <div style={{ fontSize: '11px', color: '#aaa' }}>
                        mastered
                      </div>
                    </>
                  )}
                  {isAvailable && (
                    <div style={{
                      marginTop: total > 0 ? '8px' : '0',
                      fontSize: '20px',
                      color,
                    }}>
                      →
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeScreen;