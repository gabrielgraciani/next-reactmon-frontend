import { Colors } from 'styles/colors';
import styled from 'styled-components';

const Container = styled.div`
  transition: all 0.3s ease;
  width: 100%;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4%);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 16rem;
  justify-content: center;
  background: linear-gradient(
    45deg,
    #7f9686 0%,
    #657366 34%,
    #505a51 71%,
    #4f5940 100%
  );
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;

const Image = styled.img`
  max-width: 6rem;
  width: 100%;
`;

const Content = styled.div`
  background: ${Colors.white};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`;

const Name = styled.h4`
  width: 100%;
  text-align: center;
  font-size: 2.6rem;
  color: ${Colors.black};
  font-weight: normal;
`;

const Description = styled.span`
  width: 100%;
  text-align: center;
  color: ${Colors.darkGrayOpacity50};
`;

const Footer = styled.div`
  width: 100%;
  padding: 2.5rem 1.5rem;
  background: ${Colors.orange};
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  text-align: center;
  flex-grow: 1;
  font-size: 1.7rem;
`;

export { Container, ImageContainer, Image, Content, Name, Description, Footer };
