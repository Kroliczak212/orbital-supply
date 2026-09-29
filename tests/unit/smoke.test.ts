describe("konfiguracja testów", () => {
  it("uruchamia Vitest z jsdom", () => {
    expect(document.body).toBeInTheDocument();
  });
});
