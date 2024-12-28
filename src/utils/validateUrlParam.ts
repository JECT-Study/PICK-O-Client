/**
 * URL에서 가져온 파라미터 값을 검증하고, 유효하지 않을 경우 기본값을 반환합니다.
 *
 * @template T - 파라미터 값의 타입 (예: 문자열)
 * @param param - URL에서 가져온 파라미터 값 (string | null)
 * @param defaultValue - 기본값으로 반환할 값
 * @param isValid - 파라미터 값의 유효성을 검사하는 함수
 * @returns 검증된 파라미터 값 또는 기본값
 */
export const validateUrlParam = <T extends string>(
  param: string | null,
  defaultValue: T,
  isValid: (value: string) => boolean,
): T => {
  return param && isValid(param) ? (param as T) : defaultValue;
};
