import { ERROR } from '@/constants/message';
import { isAllLessThan, isEmptyString } from '@/utils/validator';
import { createArrayFromCommaString } from '@/utils/array';
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
    return { message: ERROR.CREATE.EMPTY_TITLE, isValid: false };
  }

  return { message: '', isValid: true };
};

export const validateGameTag = (form: BalanceGame) => {
  const subTagList = createArrayFromCommaString(form.subTag);

  if (isEmptyString(form.mainTag)) {
    return { isValid: false };
  }
  if (subTagList.length > 3) {
    return { isValid: false };
  }
  if (!isAllLessThan(subTagList, 10)) {
    return { isValid: false };
  }

  return { isValid: true };
};
