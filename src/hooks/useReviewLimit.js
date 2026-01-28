import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'slicerReviews';
const DAILY_LIMIT = 3;

export function useReviewLimit() {
  const [reviewData, setReviewData] = useState({ canReview: true, remaining: DAILY_LIMIT });

  const checkReviewLimit = useCallback(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return { canReview: true, remaining: DAILY_LIMIT };
    }

    try {
      const data = JSON.parse(stored);
      if (data.date !== today) {
        // New day, reset the counter
        localStorage.removeItem(STORAGE_KEY);
        return { canReview: true, remaining: DAILY_LIMIT };
      }

      const remaining = DAILY_LIMIT - data.count;
      return {
        canReview: remaining > 0,
        remaining: Math.max(0, remaining)
      };
    } catch (e) {
      // If parsing fails, reset
      localStorage.removeItem(STORAGE_KEY);
      return { canReview: true, remaining: DAILY_LIMIT };
    }
  }, []);

  const incrementReviewCount = useCallback(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem(STORAGE_KEY);
    let data;

    try {
      data = stored ? JSON.parse(stored) : { date: today, count: 0 };
    } catch (e) {
      data = { date: today, count: 0 };
    }

    if (data.date !== today) {
      data = { date: today, count: 0 };
    }

    data.count++;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    // Update state
    const newRemaining = DAILY_LIMIT - data.count;
    setReviewData({
      canReview: newRemaining > 0,
      remaining: Math.max(0, newRemaining)
    });
  }, []);

  // Check limit on mount and when window gains focus
  useEffect(() => {
    const updateLimit = () => {
      setReviewData(checkReviewLimit());
    };

    updateLimit();

    window.addEventListener('focus', updateLimit);
    return () => window.removeEventListener('focus', updateLimit);
  }, [checkReviewLimit]);

  return {
    ...reviewData,
    incrementReviewCount
  };
}
