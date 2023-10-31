interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export const getVisibleColor = (backgroundColor: RGBColor): RGBColor => {
  const backgroundLuminance =
    0.299 * backgroundColor.r +
    0.587 * backgroundColor.g +
    0.114 * backgroundColor.b;

  const textColor: RGBColor =
    backgroundLuminance > 128
      ? { r: 0, g: 0, b: 0 }
      : { r: 255, g: 255, b: 255 };

  return textColor;
};
