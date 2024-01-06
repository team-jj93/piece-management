test("test", () => {
  let cache = 15;
  const index = 3;
  const count = 15;
  const currentIndex = Math.floor(cache / 15);

  console.log(currentIndex + 1, (index + 1 - currentIndex), (index - currentIndex) * count);
});