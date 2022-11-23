function stringNormalizer(input: string, normalizer: string | RegExp) {
  const result: Description = {
    about: '',
    paragraphs: [],
  }
  const clearedStringArray = input
      .split(normalizer)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

  result.about = clearedStringArray[0];

  for (let i = 2; i <= clearedStringArray.length; i += 2) {
    result.paragraphs.push({
      title: clearedStringArray[i - 1],
      body: clearedStringArray[i],
    })
  }

  return result;
}

export default stringNormalizer;
