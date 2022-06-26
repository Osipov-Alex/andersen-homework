const concatStrings = (str, separator) => {
  return (nextString, nextSeparator) => {
    if (typeof nextString !== 'string') return str;
    const currentSeparator = (typeof separator !== 'string') ? '' : separator;
    return concatStrings(str + currentSeparator + nextString, nextSeparator ? nextSeparator : currentSeparator);
  };
};
