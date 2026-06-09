export function createCard(word, reading, meaning) {
  return {
    word,
    reading,
    meaning,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReview: Date.now() ,  //+ 24 * 60 * 60 * 1000
  };
}

export function gradeCard(card, grade) {
  const updated = { ...card };

  if (grade === 0) {
    updated.repetitions = 0;
    updated.interval = 1 / 1440;
  } else if (grade === 1) {
    updated.repetitions = 0;
    updated.interval = 6 / 1440;
  } else {
    if (updated.repetitions === 0) updated.interval = 1;
    else if (updated.repetitions === 1) updated.interval = 6;
    else updated.interval = Math.round(updated.interval * updated.easeFactor);

    updated.repetitions++;
    updated.easeFactor = Math.max(
      1.3,
      updated.easeFactor + 0.1 - (3 - grade) * (0.08 + (3 - grade) * 0.02)
    );
  }

  updated.nextReview = Date.now() + updated.interval * 24 * 60 * 60 * 1000;
  return updated;
}

export function isDue(card) {
  return card.nextReview <= Date.now() + 60000;
}

export function isMastered(card) {
  return card.interval >= 21;
}