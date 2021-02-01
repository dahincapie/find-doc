export const capitalize = (wordToCap) => {
    if (typeof wordToCap !== 'string') return ''
    return wordToCap.charAt(0).toUpperCase() + wordToCap.slice(1)
  };
  