export const getAverageRGB = (
  imgSrc: string
): Promise<{ averageR: number; averageG: number; averageB: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imgSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      let totalR = 0;
      let totalG = 0;
      let totalB = 0;

      if (imageData) {
        for (let i = 0; i < imageData.data.length; i += 4) {
          totalR += imageData.data[i];
          totalG += imageData.data[i + 1];
          totalB += imageData.data[i + 2];
        }
        const pixelCount = imageData.data.length / 4;
        const averageR = totalR / pixelCount;
        const averageG = totalG / pixelCount;
        const averageB = totalB / pixelCount;

        resolve({ averageR, averageG, averageB });
      }
    };
  });
};
