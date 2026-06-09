import React from 'react';

function NavTabs({ activeTab, onTabChange, dueCount }) {
  return (
    <div style={{
      display: 'flex',
      borderBottom: '1px solid #e0e0e0',
      marginBottom: '1.5rem',
    }}>
      {['reading', 'review', 'progress'].map(tab => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          style={{
            padding: '10px 20px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: activeTab === tab ? '600' : '400',
            color: activeTab === tab ? '#1a1a1a' : '#888',
            borderBottom: activeTab === tab ? '2px solid #1a1a1a' : '2px solid transparent',
            marginBottom: '-1px',
            fontFamily: 'inherit',
          }}
        >
          {tab === 'reading' && '読む Reading'}
          {tab === 'review' && `復習 Review${dueCount > 0 ? ` (${dueCount})` : ''}`}
          {tab === 'progress' && '進捗 Progress'}
        </button>
      ))}
    </div>
  );
}

export default NavTabs;