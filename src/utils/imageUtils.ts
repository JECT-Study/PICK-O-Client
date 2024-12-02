export const resizeImage = (
  imageFile: File,
  targetWidth: number,
  targetHeight: number,
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(imageFile);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Canvas context를 가져올 수 없습니다.'));
        return;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const scale = Math.max(
        targetWidth / img.width,
        targetHeight / img.height,
      );

      const x = (targetWidth - img.width * scale) / 2;
      const y = 0;

      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, targetWidth, targetHeight);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('이미지 변환에 실패했습니다.'));
          }
        },
        'image/jpeg',
        0.9,
      );
    };

    img.onerror = () => {
      reject(new Error('이미지 파일을 로드하는 데 실패했습니다.'));
    };
  });
};
