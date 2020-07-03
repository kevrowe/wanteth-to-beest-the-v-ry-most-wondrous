export interface Pokemon {
  id: number;
  name: string;
  description: string;
}

export const search = async (query: string): Promise<Pokemon> => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}pokemon/${query}`
  );

  if (response.status === 200) {
    try {
      return await response.json();
    } catch (e) {
      return {
        id: -1,
        name: "Error",
        description: "No entiendo la descripción",
      };
    }
  } else {
    return {
      id: -1,
      name: "Error",
      description: `Error: ${response.statusText}`,
    };
  }
};
