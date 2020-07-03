export const search = async (query: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}search?pokemon=${query}`
  );

  if (response.status === 200) {
    try {
      return await response.text();
    } catch (e) {
      return "No entiendo la descripción";
    }
  } else {
    return `Error: ${response.statusText}`;
  }
};
