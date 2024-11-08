import { useState } from 'react';

type TagType = 'all' | 'talkpick' | 'game';

const useTagFilter = (defaultTag: TagType) => {
  const [selectedTag, setSelectedTag] = useState<TagType>(defaultTag);

  const handleTagClick = (tag: TagType) => {
    setSelectedTag(tag);
  };

  return { selectedTag, handleTagClick };
};

export default useTagFilter;
