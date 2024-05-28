// useDimensions.js
import { useEffect, useState } from 'react';
import { Dimensions, useWindowDimensions } from 'react-native';

const useDimensions = () => {
  const { height, width } = useWindowDimensions();
  const [dimensions, setDimensions] = useState({ height, width });

  useEffect(() => {
    setDimensions({ height, width });
  }, [height, width]);

  const setHeight = (h) => (dimensions.height / 100) * h;

  const setWidth = (w) => (dimensions.width / 100) * w;

  return {
    setHeight,
    setWidth,
    height: dimensions.height,
    width: dimensions.width,
  };
};

export default useDimensions;
