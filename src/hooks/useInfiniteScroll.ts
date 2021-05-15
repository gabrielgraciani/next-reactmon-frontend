import { useState, useEffect, useCallback } from 'react';

interface IUseInfiniteScrollProps {
  isFetching: boolean;
  hasNextPage: boolean;
  handleLoadMore: () => void;
}

const defaultScrollHeight = 20;

export function useInfiniteScroll({
  handleLoadMore,
  hasNextPage,
  isFetching,
}: IUseInfiniteScrollProps): void {
  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    if (
      scrollTop + window.innerHeight + defaultScrollHeight >= scrollHeight &&
      !isFetching
    ) {
      setIsBottom(true);
    }
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const onLoadMore = useCallback(() => {
    handleLoadMore();
    setIsBottom(false);
  }, [handleLoadMore]);

  useEffect(() => {
    if (isBottom && hasNextPage) {
      onLoadMore();
    }
  }, [isBottom, hasNextPage, onLoadMore]);
}
