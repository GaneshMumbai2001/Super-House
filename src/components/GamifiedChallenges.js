import { useRouter } from 'next/router';
import React, { useState } from 'react';

// Sample data for challenges and rewards
const challengesData = [
  {
    id: 1,
    title: 'Complete Tutorial 1',
    description: 'Learn the basics of React.',
  },
  {
    id: 2,
    title: 'Build a To-Do App',
    description: 'Create a to-do list application with React.',
  },
  // Add more challenges
];

const rewardsData = [
  {
    id: 1,
    name: 'Badge: React Beginner',
    imageUrl: '/react-beginner-badge.png',
  },
  {
    id: 2,
    name: 'Coupon: 10% off React Course',
    imageUrl: '/react-course-coupon.png',
  },
  // Add more rewards
];

function GamifiedChallenges() {
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [unlockedRewards, setUnlockedRewards] = useState([]);
  const [rewardsEarned, setRewardsEarned] = useState(0);
  const router = useRouter()

  const completeChallenge = (challengeId) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges([...completedChallenges, challengeId]);

      const unlockedReward = rewardsData.find(
        (reward) => reward.id === challengeId
      );
      if (unlockedReward) {
        setUnlockedRewards([...unlockedRewards, unlockedReward]);
      }
    }
  };

  const handleEarnClick = () => {
    setRewardsEarned(rewardsEarned + 1);
    router.push("/View")
  };

  return (
    <div>
      <h1>Challenges</h1>
      <ul>
        {challengesData.map((challenge) => (
          <li key={challenge.id}>
            <strong>{challenge.title}</strong>
            <p>{challenge.description}</p>
            {!completedChallenges.includes(challenge.id) && (
              <button onClick={() => completeChallenge(challenge.id)}>
                Complete Challenge
              </button>
            )}
          </li>
        ))}
      </ul>
      <h2>Unlocked Rewards</h2>
      <ul>
        {unlockedRewards.map((reward) => (
          <li key={reward.id}>
            <img src={reward.imageUrl} alt={reward.name} />
            <p>{reward.name}</p>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handleEarnClick}>Earn</button>
        <p>You have earned: {rewardsEarned} points.</p>
        <p>File: <a href="/path-to-reward-file.pdf" download>Download Reward</a>
        </p>
      </div>
    </div>
  );
}

export default GamifiedChallenges;
