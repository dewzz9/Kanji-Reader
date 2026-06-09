import React, { useState, useEffect } from 'react';
import NavTabs from './components/NavTabs';
import HomeScreen from './components/HomeScreen';
import LevelScreen from './components/LevelScreen';
import FlashCard from './components/FlashCard';
import Progress from './components/Progress';
import { PASSAGES_N5 } from './data/passagesN5';
import { PASSAGES_N4 } from './data/passagesN4';
import { PASSAGES_N3 } from './data/passagesN3';
import { PASSAGES_N2 } from './data/passagesN2';
import { KANJI_DATA } from './data/kanjiData';
import { createCard, gradeCard, isDue } from './utils/srs';
import './App.css';

const ALL_PASSAGES = {
  N5: PASSAGES_N5,
  N4: PASSAGES_N4,
  N3: PASSAGES_N3,
  N2: PASSAGES_N2,
};

function loadState() {
  try {
    const saved = localStorage.getItem('kanjiReaderState_v2');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return { srsCards: {} };
}

function saveState(state) {
  try {
    localStorage.setItem('kanjiReaderState_v2', JSON.stringify(state));
  } catch (e) {}
}

function App() {
  const [activeTab, setActiveTab] = useState('reading');
  const [srsCards, setSrsCards] = useState({});
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [reviewQueue, setReviewQueue] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);

  useEffect(() => {
    const saved = loadState();
    if (saved.srsCards) setSrsCards(saved.srsCards);
  }, []);

  useEffect(() => {
    if (Object.keys(srsCards).length > 0) {
      saveState({ srsCards });
    }
  }, [srsCards]);

  const dueCount = Object.values(srsCards).filter(c => isDue(c)).length;

  const handleMarkWord = (segment) => {
    const cardKey = `${segment.word}-${segment.reading}`;
    const kanjiEntry = KANJI_DATA[segment.kanji];
    const level = kanjiEntry ? kanjiEntry.level : selectedLevel;

    setSrsCards(prev => {
      const existing = prev[cardKey];
      if (existing && existing.unknown) {
        return { ...prev, [cardKey]: { ...existing, unknown: false } };
      }
      const newCard = {
        ...createCard(segment.word, segment.reading, segment.meaning),
        unknown: true,
        level,
      };
      return { ...prev, [cardKey]: newCard };
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'review') {
      const due = Object.values(srsCards).filter(c => isDue(c));
      setReviewQueue(due);
      setCurrentCard(due[0] || null);
    }
  };

  const handleGrade = (grade) => {
    if (!currentCard) return;
    const cardKey = `${currentCard.word}-${currentCard.reading}`;
    const updated = { ...gradeCard(currentCard, grade), unknown: false };

    setSrsCards(prev => ({ ...prev, [cardKey]: updated }));

    if (grade === 0) {
      const remaining = [...reviewQueue.slice(1), updated];
      setReviewQueue(remaining);
      setCurrentCard(remaining[0] || null);
    } else {
      const remaining = reviewQueue.slice(1);
      setReviewQueue(remaining);
      setCurrentCard(remaining[0] || null);
    }
  };

  const handleReset = () => {
    setSrsCards({});
    setReviewQueue([]);
    setCurrentCard(null);
    localStorage.removeItem('kanjiReaderState_v2');
  };

  return (
    <div style={{
      maxWidth: '700px',
      margin: '0 auto',
      padding: '2rem 1rem',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
      }}>
        <div
          onClick={() => { setSelectedLevel(null); setActiveTab('reading'); }}
          style={{ cursor: 'pointer' }}
        >
          <h1 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
            漢字リーダー
          </h1>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
            Kanji Reader · JLPT N2
          </div>
        </div>
        {dueCount > 0 && (
          <div
            onClick={() => handleTabChange('review')}
            style={{
              fontSize: '12px',
              padding: '4px 12px',
              background: '#fff0ec',
              borderRadius: '20px',
              color: '#e05a2b',
              cursor: 'pointer',
              border: '1px solid #e05a2b40',
            }}
          >
            {dueCount} due for review
          </div>
        )}
      </div>

      <NavTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        dueCount={dueCount}
      />

      {activeTab === 'reading' && (
        selectedLevel ? (
          <LevelScreen
            level={selectedLevel}
            passages={ALL_PASSAGES[selectedLevel]}
            srsCards={srsCards}
            onMarkWord={handleMarkWord}
            onBack={() => setSelectedLevel(null)}
          />
        ) : (
          <HomeScreen
            onSelectLevel={setSelectedLevel}
            srsCards={srsCards}
          />
        )
      )}

      {activeTab === 'review' && (
        <FlashCard
          card={currentCard}
          onGrade={handleGrade}
          remaining={reviewQueue.length}
        />
      )}

      {activeTab === 'progress' && (
        <Progress
          srsCards={srsCards}
          passageIndex={0}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;