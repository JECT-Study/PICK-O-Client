import { useState, ChangeEvent, useCallback } from 'react';
import { BalanceGame } from '@/types/game';

function useGameInputs<T extends BalanceGame>(initialState: T) {
  const [form, setForm] = useState<T>(initialState);

  const onChange = useCallback(
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
      gameId?: number,
      gameOptionId?: number,
    ) => {
      const { name, value } = e.target;
      const isOptionUpdated =
        gameId !== undefined && gameOptionId !== undefined;

      if (isOptionUpdated) {
        if (gameOptionId < 0) {
          // games의 gameId번째 description 값 업데이트
          setForm((prevForm) => {
            const updatedGames = [...prevForm.games];
            updatedGames[gameId] = {
              ...updatedGames[gameId],
              [name]: value,
            };

            return { ...prevForm, games: updatedGames };
          });
        } else if (gameOptionId >= 0) {
          // gameOption 값 업데이트
          setForm((prevForm) => {
            const updatedGames = [...prevForm.games];
            const updatedGameOptions = [...updatedGames[gameId].gameOptions];

            updatedGameOptions[gameOptionId] = {
              ...updatedGameOptions[gameOptionId],
              [name]: value,
            };

            updatedGames[gameId] = {
              ...updatedGames[gameId],
              gameOptions: updatedGameOptions,
            };

            return { ...prevForm, games: updatedGames };
          });
        }
      } else {
        // BalanceGame 값 업데이트
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
      }
    },
    [],
  );

  const setEach = useCallback(
    <U>(name: string, value: U, gameId?: number, gameOptionId?: number) => {
      const isOptionUpdated =
        gameId !== undefined && gameOptionId !== undefined;

      if (isOptionUpdated) {
        if (gameOptionId < 0) {
          // games의 gameId번째 description 값 업데이트
          setForm((prevForm) => {
            const updatedGames = [...prevForm.games];
            updatedGames[gameId] = {
              ...updatedGames[gameId],
              [name]: value,
            };

            return { ...prevForm, games: updatedGames };
          });
        } else if (gameOptionId >= 0) {
          // gameOption 값 업데이트
          setForm((prevForm) => {
            const updatedGames = [...prevForm.games];
            const updatedGameOptions = [...updatedGames[gameId].gameOptions];

            updatedGameOptions[gameOptionId] = {
              ...updatedGameOptions[gameOptionId],
              [name]: value,
            };

            updatedGames[gameId] = {
              ...updatedGames[gameId],
              gameOptions: updatedGameOptions,
            };

            return { ...prevForm, games: updatedGames };
          });
        }
      } else {
        // BalanceGame 값 업데이트
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
      }
    },
    [],
  );

  return { form, setForm, onChange, setEach };
}

export default useGameInputs;
