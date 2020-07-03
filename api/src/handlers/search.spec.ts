import searchHandler from "./search";
import { Response, Request } from "express";

const mockedDescription =
  "Spits fire that\nis hot enough to\nmelt boulders.\fKnown to cause\nforest fires\nunintentionally.";

const mockedTranslation =
  "Spits fire yond is hot enow to melt boulders. Known to cause forest fires unintentionally.";

const mockPokeClient = {
  getSpecies: jest
    .fn()
    .mockResolvedValue([
      ,
      { id: 6, name: "charizard", description: mockedDescription },
    ]),
};

const mockTranslationClient = {
  shakespeare: jest.fn().mockResolvedValue([, mockedTranslation]),
};

const search = searchHandler.bind(null, {
  poke: mockPokeClient,
  translate: mockTranslationClient,
});

describe("Search handler", () => {
  it("should error when pokemon not found", async () => {
    expect.assertions(2);

    const mockError = "No veo ese pokemon";

    const res: Response = { status: jest.fn(), send: jest.fn() } as any;
    const req: Request = { params: { pokemon: "charizard" } } as any;

    mockPokeClient.getSpecies.mockResolvedValueOnce([new Error(mockError)]);

    await search(req, res, {} as any);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith(`Pokemon Error: ${mockError}`);
  });
  it("should error when translation API fails", async () => {
    expect.assertions(2);

    const mockError = "No dice";

    const res: Response = { status: jest.fn(), send: jest.fn() } as any;
    const req: Request = { params: { pokemon: "charizard" } } as any;

    mockTranslationClient.shakespeare.mockResolvedValueOnce([
      new Error(mockError),
    ]);

    await search(req, res, {} as any);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(`Translation Error: ${mockError}`);
  });
  it("queries pokemon and translation clients and sends result", async () => {
    expect.assertions(3);

    const res: Response = { send: jest.fn() } as any;
    const req: Request = { params: { pokemon: "charizard" } } as any;

    await search(req, res, {} as any);

    expect(mockPokeClient.getSpecies).toHaveBeenCalledWith("charizard");
    expect(mockTranslationClient.shakespeare).toHaveBeenCalledWith(
      mockedDescription
    );
    expect(res.send).toHaveBeenCalledWith({
      id: 6,
      name: "charizard",
      description: mockedTranslation,
    });
  });
});
