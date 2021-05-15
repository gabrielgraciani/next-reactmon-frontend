import { SpecificationsRow, SpecificationsText } from './Card.styles';
import { ICardSpecificationItemProps } from './Card.types';

const CardSpecificationItem = ({
  title,
  value,
}: ICardSpecificationItemProps): JSX.Element => {
  return (
    <SpecificationsRow>
      <SpecificationsText align="right">{title}</SpecificationsText>
      <SpecificationsText align="left">{value}</SpecificationsText>
    </SpecificationsRow>
  );
};

export default CardSpecificationItem;
