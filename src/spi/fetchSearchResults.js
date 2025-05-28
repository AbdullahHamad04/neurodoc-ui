export const fetchSearchResults = async (query, lang) => {
  const response = await fetch('http://localhost:9200/ndoc_documents/_search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: {
        multi_match: {
          query: query,
          fields: [`title.${lang}`, `summary.${lang}`],
        }
      },
      highlight: {
        fields: {
          [`title.${lang}`]: {},
          [`summary.${lang}`]: {},
        }
      }
    }),
  });

  const data = await response.json();
  return data?.hits?.hits || [];
};
