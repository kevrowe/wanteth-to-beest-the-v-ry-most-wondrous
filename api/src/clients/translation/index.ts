import "isomorphic-fetch";

interface TranslationClient {
  shakespeare(input: string): Promise<[Error?, string?]>;
}

export default (baseUrl: string): TranslationClient => ({
  shakespeare: async (input: string) => {
    const response = await fetch(`${baseUrl}/translate/shakespeare`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: `text=${input}`,
    });

    if (response.status !== 200) {
      try {
        const errorJson = await response.json();

        return [new Error(errorJson.error.message)];
      } catch (parseError) {
        return [new Error(response.statusText)];
      }
    }

    const data = await response.json();

    return [, data.contents.translated];
  },
});
