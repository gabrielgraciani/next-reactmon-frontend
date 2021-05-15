import { Colors } from 'styles/colors';
import styled from 'styled-components';

const Container = styled.div`
  transition: all 0.3s ease;
  border-radius: 1rem;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    transform: translateY(-4%);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 18rem;
`;

const Svg = styled.svg`
  position: absolute;
  bottom: -0.1rem;
  left: 0;
  fill: ${Colors.mediumGray};
  transform: rotate(180deg);
`;

const SvgPath = styled.path``;

const Content = styled.div`
  width: 100%;
  background: ${Colors.mediumGray};
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: 0 3rem 3rem;
  justify-content: center;
`;

const Name = styled.h4`
  width: 100%;
  font-size: 3rem;
  font-weight: normal;
`;

const Description = styled.span`
  display: block;
  width: 100%;
  margin-top: 1.5rem;
  color: ${Colors.gray};
`;

export {
  Container,
  ImageContainer,
  Image,
  Svg,
  SvgPath,
  Content,
  Name,
  Description,
};
