// round to the nearest segment size - used in the lookup map
export const round = (x, n) => parseInt(Math.round(x / n) * n);

// round up to the nearest segment size so active segment is correct
export const roundUp = (x, n) => parseInt(Math.ceil(x / n) * n);

// generate lookup map
export const generateSegmentMap = (segments) => {
  return [...segments].reverse().reduce((prev, next, i, arr) => {
    const key = round((i + 1) * (360 / arr.length), 360 / arr.length);

    return {
      ...prev,
      [key]: next,
    };
  }, {});
};

// calculate the key to lookup in the map
export const getMapValue = (angle, arr, offset) =>
  roundUp((offset + angle) % 360, 360 / arr.length);

export const isBrowser = typeof window !== "undefined";

export const getFontSize = (text) => {
  if (text.length >= 20) return 44;
  if (text.length >= 18) return 40;
  if (text.length >= 16) return 36;
  if (text.length >= 14) return 32;
  if (text.length >= 12) return 28;
  if (text.length >= 10) return 24;
  if (text.length >= 8) return 20;
  return 16;
};
