//konwerter em do pixeli
export function emToPixels(emValue) {
  const emInPixels = 16; // W tym pojekcie 1em = 16px
  return parseFloat(emValue) * emInPixels;
}
