import mockResponse from "./index.mock";
import nock from "nock";
import PokeClient from "./index";

const MOCK_API = "http://poke.local";
const nockScope = nock(MOCK_API);

describe("PokeClient", () => {
  beforeEach(() => {
    nock.cleanAll();
  });
  it("should handle non-200 plain response", async () => {
    nockScope.get("/pokemon-species/charizard").reply(500);

    const client = PokeClient(MOCK_API);
    const [err, result] = await client.getDescription("charizard");

    expect(err).toBeInstanceOf(Error);
    expect(err!.message).toBe("Internal Server Error");
    expect(result).toBeUndefined();
  });
  it("should fetch successful result from poke API", async () => {
    nockScope.get("/pokemon-species/charizard").reply(200, mockResponse);

    const client = PokeClient(MOCK_API);
    const [err, result] = await client.getDescription("charizard");

    expect(err).toBeUndefined();
    expect(result).toEqual({
      id: 6,
      description: mockResponse.flavor_text_entries.filter(
        (e) => e.language.name === "en"
      )[0].flavor_text,
    });
  });
});
