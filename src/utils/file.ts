/**
 * File 객체를 URL로 변환하여 반환하는 함수
 */

export const createImageUrlFromFile = (file: File): string => {
  return URL.createObjectURL(file);
};

/**
 * 이미지 URL을 File 객체로 변환하는 함수
 * @param url - 이미지 URL
 * @param filename - 변환할 파일의 이름
 */

export const createFileFromUrl = async (
  url: string,
  filename: string,
): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};
