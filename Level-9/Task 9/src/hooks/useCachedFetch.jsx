import { useState, useEffect } from 'react';

const cache = {};

const useCachedFetch = (url) => {
  const [data, setData] = useState(cache[url] || null);
  const [loading, setLoading] = useState(!cache[url]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cache[url]) {
      setLoading(true);
      fetch(url)
        .then(res => res.json())
        .then(json => {
          cache[url] = json;
          setData(json);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }
  }, [url]);

  return { data, loading, error };
};

export default useCachedFetch;
