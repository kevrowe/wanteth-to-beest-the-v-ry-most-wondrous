import nock from "nock";
import TranslationClient from "./index";

const MOCK_API = "http://translate.local";

const nockScope = nock(MOCK_API);
const mockResponse =
  "Spits fire yond is hot enow to melt boulders. Known to cause forest fires unintentionally";

describe("TranslationClient", () => {
  beforeEach(() => {
    nock.cleanAll();
  });
  it("should parse the response from a shakespeare request", async () => {
    nockScope.post("/translate/shakespeare").reply(200, {
      contents: {
        translated: mockResponse,
      },
    });

    const client = TranslationClient(MOCK_API);
    const [err, result] = await client.shakespeare("some input");

    expect(result).toBe(mockResponse);
    expect(err).toBeUndefined();
  });
  it("should handle non-200 JSON response", async () => {
    const mockError = "Something dun' broke";
    nockScope.post("/translate/shakespeare").reply(400, {
      error: {
        code: 400,
        message: mockError,
      },
    });

    const client = TranslationClient(MOCK_API);
    const [err, result] = await client.shakespeare("some input");

    expect(err).toBeInstanceOf(Error);
    expect(err!.message).toBe(mockError);
    expect(result).toBeUndefined();
  });
  it("should handle non-200 plain response", async () => {
    nockScope.post("/translate/shakespeare").reply(500);

    const client = TranslationClient(MOCK_API);
    const [err, result] = await client.shakespeare("some input");

    expect(err).toBeInstanceOf(Error);
    expect(err!.message).toBe("Internal Server Error");
    expect(result).toBeUndefined();
  });
});
