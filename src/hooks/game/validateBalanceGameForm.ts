import { ERROR } from '@/constants/message';
import { isEmptyString } from '@/utils/validator';
import { BalanceGame } from '@/types/game';

export const validateBalanceGameForm = (
  form: BalanceGame,
  gameStage: number,
) => {
  const options = form.games[gameStage].gameOptions;
  const hasBothImages = options[0]?.imgUrl.trim() && options[1]?.imgUrl.trim();
  const hasNoImages = !options[0]?.imgUrl.trim() && !options[1]?.imgUrl.trim();

  if (isEmptyString(options[0].name) || isEmptyString(options[1].name)) {
    return { message: ERROR.VALIDATE.OPTION, isValid: false };
  }
  if (!(hasBothImages || hasNoImages)) {
    return { message: ERROR.VALIDATE.GAME_IMAGE, isValid: false };
  }
  if (gameStage === 9 && isEmptyString(form.title)) {
    return { message: '제목을 입력해 주세요!', isValid: false };
  }

  return { message: '', isValid: true };
};

export const validateGameTag = (form: BalanceGame) => {
  if (isEmptyString(form.mainTag)) {
    return { isValid: false };
  }

  return { isValid: true };
};
