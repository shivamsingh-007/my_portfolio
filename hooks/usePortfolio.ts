
import { useState, useEffect } from 'react';
import { PortfolioData } from '../types';
import { INITIAL_DATA } from '../constants';

const STORAGE_KEY = 'portfolio_data_v1';

export const usePortfolio = () => {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const updateData = (newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const resetData = () => {
    setData(INITIAL_DATA);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { data, updateData, resetData };
};
