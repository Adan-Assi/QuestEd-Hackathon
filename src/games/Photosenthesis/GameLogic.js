export function generateGameIdea(interest1, interest2, subject) {
  const combo = `${interest1.toLowerCase()}-${interest2.toLowerCase()}-${subject.toLowerCase()}`;

  const ideas = {
    'cars-dogs-photosynthesis': {
      title: '🚗 Fuel My Ride',
      description: 'Your eco-car and dog Max collect sunlight, water, and CO₂ to generate leaf energy!',
      badge: 'Eco Explorer',
      image: '/images/fuel-preview.gif',
      route: '/fuel-my-ride'
    },
    'cats-space-gravity': {
      title: '🐱 AstroCat',
      description: 'Guide a cat through low-gravity worlds to understand motion and force!',
      badge: 'Gravity Genius',
      image: '/images/astrocat.png'
    },
    'soccer-pizza-fractions': {
      title: '⚽ Slice & Score',
      description: 'Use pizza slices to solve fractions and win the math match!',
      badge: 'Math MVP',
      image: '/images/slice-score.png'
    },

    // ✅ New case for baking-none-fractions
    'baking-none-fractions': {
      title: '🍰 Baking with Fractions',
      description: 'Learn fractions while baking cakes! Measure, mix, and master math.',
      badge: 'Baking Pro',
      image: '/images/baking-fractions.png',
      //route: '/baking'
      route: '/modes'
    }
  };

  const fallback = {
    title: '🎲 Custom Quest',
    description: `A personalized game using ${interest1}, ${interest2}, and ${subject}.`,
    badge: 'Explorer'
  };

  return ideas[combo] || fallback;
}
