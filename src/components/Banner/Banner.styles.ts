import { Colors } from 'styles/colors';
import styled from 'styled-components';
import { IBannerStyledProps } from './Banner.types';

const Container = styled.section<IBannerStyledProps>`
  background: url(${props => props.image});
  background-size: cover;
  padding: 10rem 5%;
  position: relative;
  background-position: center;

  &:after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${Colors.blackOpacity70};
  }
`;

const ContentContainer = styled.div`
  max-width: 800px;
  z-index: 9;
  position: relative;
`;

const Title = styled.h1`
  font-size: 7rem;
  color: ${Colors.white};
  margin-bottom: 2rem;
`;

const TextContainer = styled.div`
  p {
    color: ${Colors.white};
    font-weight: 100;
    font-size: 2rem;
    line-height: 2rem;
    margin: 2rem 0 0;
  }
`;

export { Container, ContentContainer, Title, TextContainer };
