import styled from 'styled-components';

import { Colors } from 'styles/colors';
import { Breakpoints } from 'styles/breakpoints';

const Container = styled.header`
  width: 100%;
  border-bottom: 0.1rem solid ${Colors.grayOpacity50};
  padding: 0 5%;
  height: 8rem;
  display: flex;
  align-items: center;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProjectName = styled.h2`
  font-size: 2.5rem;

  @media (max-width: ${Breakpoints.tiny}) {
    display: none;
  }
`;

const Menu = styled.nav`
  margin-left: 5rem;
  display: flex;
  align-items: center;
  flex-grow: 1;

  @media (max-width: ${Breakpoints.tiny}) {
    margin-left: 0rem;
  }
`;

const MenuItem = styled.a`
  display: inline-block;
  line-height: 8rem;
  cursor: pointer;
  position: relative;
  color: ${Colors.lightGray};

  & + a {
    margin-left: 2rem;
  }

  &.active {
    color: ${Colors.white};

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.3rem;
      background: ${Colors.white};
    }
  }
`;

const LoginButton = styled.a``;

const UserInformation = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
`;

const UserName = styled.span`
  @media (max-width: ${Breakpoints.tiny}) {
    display: none;
  }
`;

const UserAvatar = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin: 0 1rem;
  background: ${Colors.gray};
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: ${Colors.black};
  font-weight: bold;
  font-size: 1.6rem;
`;

const PopoverContent = styled.div``;

const PopoverContentItem = styled.a`
  display: block;

  & + a {
    margin-top: 1rem;
  }
`;

const PopoverIconContainer = styled.div`
  @media (max-width: ${Breakpoints.tiny}) {
    display: none;
  }
`;

export {
  Container,
  HeaderContent,
  ProjectName,
  Menu,
  MenuItem,
  LoginButton,
  UserInformation,
  UserName,
  UserAvatar,
  PopoverContent,
  PopoverContentItem,
  PopoverIconContainer,
};
