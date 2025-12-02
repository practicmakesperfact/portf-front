import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (apiCall, successMessage = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiCall();
      
      if (successMessage) {
        toast.success(successMessage);
      }
      
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Something went wrong';
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, callApi };
};