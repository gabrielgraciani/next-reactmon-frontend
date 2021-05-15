import {
  Container,
  ImageContainer,
  Image,
  Content,
  Name,
  Description,
  Footer,
} from './Item.styles';
import { IItemProps } from './Item.types';

const Item = ({ item }: IItemProps): JSX.Element => {
  return (
    <Container>
      <ImageContainer>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.image}`}
          alt=""
        />
      </ImageContainer>
      <Content>
        <Name>{item.name}</Name>
        <Description>{item.description}</Description>
      </Content>
      <Footer>{item.function}</Footer>
    </Container>
  );
};

export default Item;
