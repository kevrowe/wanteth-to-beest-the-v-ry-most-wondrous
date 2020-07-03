import "isomorphic-fetch";

export interface Pokemon {
  id: number;
  name: string;
  description: string;
}

const request = async (
  url: string,
  params?: RequestInit
): Promise<[Error?, SpeciesResponse?]> => {
  const response = await fetch(url, params);

  if (response.status !== 200) {
    return [new Error(response.statusText)];
  }

  const data = await response.json();

  return [, data];
};

export interface PokeClient {
  getDescription: (name: string) => Promise<[Error?, Pokemon?]>;
}

interface SpeciesResponse {
  id: number;
  name: string;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
  }>;
}

const _getSpecies = async (baseUrl: string, speciesName: string) => {
  return await request(`${baseUrl}/pokemon-species/${speciesName}`, {
    method: "GET",
  });
};

export default (baseUrl: string): PokeClient => {
  const getSpecies = _getSpecies.bind(null, baseUrl);

  return {
    getDescription: async (speciesName) => {
      // Should add some json validation in here for type safety
      const [error, species] = await getSpecies(speciesName);

      if (error) {
        return [error];
      }

      const flavorText =
        ((entries) => {
          for (const entry of entries) {
            if (entry.language.name === "en") return entry.flavor_text;
          }
        })(species?.flavor_text_entries!) || "";

      return [
        ,
        { id: species?.id!, name: species?.name!, description: flavorText },
      ];
    },
  };
};
