import { useState } from 'react';
import createJsonStorage from '../createJsonStorage';

const defaultIntervalValues = {};
const jsonStorage = createJsonStorage('intervals');

const useIntervalValues = () => {
  const [intervalValues, setIntervalValues] = useState(
    jsonStorage.get() || defaultIntervalValues
  );

  const numberOfIntervalValues = Object.keys(intervalValues || {}).length;

  const setIntervalValue = (key) => (field) => (e) => {
    const { value } = e.target;
    setIntervalValues((intervalValues) => {
      const newIntervalValues = {
        ...intervalValues,
        [key]: { ...intervalValues[key], [field]: value },
      };
      jsonStorage.set(newIntervalValues);

      return newIntervalValues;
    });
  };

  const resetIntervalValues = () => setIntervalValues(defaultIntervalValues);

  return {
    intervalValues,
    numberOfIntervalValues,
    setIntervalValue,
    resetIntervalValues,
  };
};

export default useIntervalValues;
