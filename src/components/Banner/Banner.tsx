import {
  Container,
  ContentContainer,
  TextContainer,
  Title,
} from './Banner.styles';
import { IBannerProps } from './Banner.types';

const Banner = ({ children, image, title }: IBannerProps): JSX.Element => {
  return (
    <Container image={image}>
      <ContentContainer>
        <Title>{title}</Title>

        <TextContainer>{children}</TextContainer>
      </ContentContainer>
    </Container>
  );
};

export default Banner;
