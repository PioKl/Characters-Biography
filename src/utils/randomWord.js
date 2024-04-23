export function randomWord(length, type) {
  let result = "";

  let characters;
  if (type === "numbers") {
    characters = "0123456789";
  } else if (type === "numbersAndSpecial") {
    characters = "0123456789#%&^+=-";
  } else if (type === "normal") {
    characters = "abcdefghijklmnopqrstuvwxyz#%&^+=-";
  } else {
    characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  }
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
