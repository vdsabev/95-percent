import { useEffect, useState } from 'react';

export const usePromise = (fn) => {
  const [state, setState] = useState(null);
  useEffect(() => {
    let subscribed = true;
    fn().then((data) => {
      if (subscribed) {
        setState(data);
      }
    });

    return () => {
      subscribed = false;
    };
  }, [fn]);

  return state;
};
