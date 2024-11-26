export interface UploadedImage {
  imgUrls: string[];
  fileIds: number[];
}

export type FileUploadType = {
  type: 'TALK_PICK' | 'TEMP_TALK_PICK' | 'GAME' | 'MEMBER';
};
