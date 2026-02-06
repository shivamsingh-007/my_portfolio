import { useState, useEffect } from 'react';

export interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  easyTotal: number;
  mediumTotal: number;
  hardTotal: number;
  acceptanceRate: number;
  ranking: number;
}

interface UseLeetCodeDataReturn {
  data: LeetCodeStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Method 1: Direct LeetCode GraphQL API
 */
async function fetchFromLeetCodeAPI(username: string): Promise<LeetCodeStats> {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
        profile {
          ranking
        }
      }
      allQuestionsCount {
        difficulty
        count
      }
    }
  `;

  const response = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Referer': 'https://leetcode.com',
      'Origin': 'https://leetcode.com',
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0]?.message || 'GraphQL error');
  }

  if (!result.data?.matchedUser) {
    throw new Error('User not found');
  }

  const acSubmissions = result.data.matchedUser.submitStats.acSubmissionNum;
  const allQuestions = result.data.allQuestionsCount;

  const allSolved = acSubmissions.find((item: any) => item.difficulty === 'All')?.count || 0;
  const easySolved = acSubmissions.find((item: any) => item.difficulty === 'Easy')?.count || 0;
  const mediumSolved = acSubmissions.find((item: any) => item.difficulty === 'Medium')?.count || 0;
  const hardSolved = acSubmissions.find((item: any) => item.difficulty === 'Hard')?.count || 0;

  const easyTotal = allQuestions.find((item: any) => item.difficulty === 'Easy')?.count || 0;
  const mediumTotal = allQuestions.find((item: any) => item.difficulty === 'Medium')?.count || 0;
  const hardTotal = allQuestions.find((item: any) => item.difficulty === 'Hard')?.count || 0;
  const totalQuestions = easyTotal + mediumTotal + hardTotal;

  const acceptanceRate = totalQuestions > 0 ? (allSolved / totalQuestions) * 100 : 0;
  const ranking = result.data.matchedUser.profile?.ranking || 0;

  return {
    totalSolved: allSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    easyTotal,
    mediumTotal,
    hardTotal,
    acceptanceRate,
    ranking,
  };
}

/**
 * Method 2: Alpha Coders API (CORS-friendly)
 */
async function fetchFromAlphaCoders(username: string): Promise<LeetCodeStats> {
  const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return {
    totalSolved: data.solvedProblem || 0,
    easySolved: data.easySolved || 0,
    mediumSolved: data.mediumSolved || 0,
    hardSolved: data.hardSolved || 0,
    easyTotal: data.totalEasy || 828,
    mediumTotal: data.totalMedium || 1732,
    hardTotal: data.totalHard || 758,
    acceptanceRate: data.acceptanceRate || 0,
    ranking: data.ranking || 0,
  };
}

/**
 * Method 3: LeetCode Stats API (fallback)
 */
async function fetchFromLeetCodeStats(username: string): Promise<LeetCodeStats> {
  const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return {
    totalSolved: data.totalSolved || 0,
    easySolved: data.easySolved || 0,
    mediumSolved: data.mediumSolved || 0,
    hardSolved: data.hardSolved || 0,
    easyTotal: 828,
    mediumTotal: 1732,
    hardTotal: 758,
    acceptanceRate: data.acceptanceRate || 0,
    ranking: data.ranking || 0,
  };
}

/**
 * Custom hook to fetch live LeetCode statistics using multiple fallback methods
 * @param username - LeetCode username
 * @returns Object containing data, loading state, error, and refetch function
 */
export const useLeetCodeData = (username: string): UseLeetCodeDataReturn => {
  const [data, setData] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeetCodeData = async () => {
    if (!username) {
      setError('Username is required');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Try multiple methods in order of preference
    const methods = [
      () => fetchFromLeetCodeAPI(username),
      () => fetchFromAlphaCoders(username),
      () => fetchFromLeetCodeStats(username),
    ];

    for (const method of methods) {
      try {
        const stats = await method();
        setData(stats);
        setError(null);
        setLoading(false);
        return;
      } catch (err) {
        console.warn('Method failed, trying next...', err);
        continue;
      }
    }

    // All methods failed
    console.error('All LeetCode data fetch methods failed');
    setError('Unable to fetch data. Please check your username and try again.');
    
    // Set fallback data on error
    setData({
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      easyTotal: 828,
      mediumTotal: 1732,
      hardTotal: 758,
      acceptanceRate: 0,
      ranking: 0,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchLeetCodeData();
  }, [username]);

  const refetch = () => {
    fetchLeetCodeData();
  };

  return { data, loading, error, refetch };
};
