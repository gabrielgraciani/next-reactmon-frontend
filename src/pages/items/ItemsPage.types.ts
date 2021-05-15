import { InfiniteData } from 'react-query';

import { IItemsResponse } from 'interfaces/responses/ItemsResponse';

export interface IItemsPageProps {
  itemsProps: InfiniteData<IItemsResponse>;
}
