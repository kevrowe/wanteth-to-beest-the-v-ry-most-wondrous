import "isomorphic-fetch";

export interface TranslationClient {
  shakespeare(input: string): Promise<[Error?, string?]>;
}

interface TranslationResponse {
  contents: {
    translated: string;
  };
}

const request = async (
  url: string,
  params?: RequestInit
): Promise<[Error?, TranslationResponse?]> => {
  const response = await fetch(url, params);

  if (response.status !== 200) {
    try {
      const errorJson = await response.json();

      return [new Error(errorJson.error.message)];
    } catch (parseError) {
      return [new Error(response.statusText)];
    }
  }

  const data = await response.json();

  return [, data];
};

export default (baseUrl: string): TranslationClient => ({
  shakespeare: async (input: string) => {
    const [error, result] = await request(`${baseUrl}/translate/shakespeare`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: `text=${input}`,
    });

    if (result) {
      return [, result.contents.translated];
    }

    return [error];
  },
});
