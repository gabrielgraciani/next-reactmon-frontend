import {
  Container,
  ImageContainer,
  Image,
  Svg,
  SvgPath,
  Content,
  Name,
  Description,
} from './City.styles';
import { ICityProps } from './City.types';

const City = ({ city }: ICityProps): JSX.Element => {
  return (
    <Container>
      <ImageContainer>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/files/${city.image}`}
          alt={city.name}
        />

        <Svg
          className="wavy"
          viewBox="0 0 250 250"
          preserveAspectRatio="xMinYMin meet"
        >
          <SvgPath d="M0,25 C50,75 175,0 250,40 L250,00 L0,0 Z" />
        </Svg>
      </ImageContainer>

      <Content>
        <Name>{city.name}</Name>
        <Description>{city.description}</Description>
      </Content>
    </Container>
  );
};

export default City;
