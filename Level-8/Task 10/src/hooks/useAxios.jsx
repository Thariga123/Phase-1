import { useEffect, useRef, useState } from 'react';
import api from '../api/axios';


const cache = new Map();

const useAxios = (url, config = {}, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!options.manual);
  const [error, setError] = useState(null);

  const shouldForceRefresh = useRef(options.forceRefresh || false);
  const currentUrl = useRef(url);

  const fetchData = async (overrideForceRefresh = false) => {
    const key = JSON.stringify({ url, config });

    const isCached = cache.has(key);
    const shouldBypassCache = overrideForceRefresh || shouldForceRefresh.current;

    if (isCached && !shouldBypassCache) {
      setData(cache.get(key));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(url, config);
      cache.set(key, response.data);
      setData(response.data);
    } catch (err) {
      setError(err.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!options.manual) {
      fetchData();
    }
  }, [url]);

  const refresh = () => fetchData(true);

  return { data, loading, error, refresh };
};

export default useAxios;
