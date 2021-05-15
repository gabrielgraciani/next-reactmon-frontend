import { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import NextLink from 'next/link';

import { ApplicationRoutes } from 'config/ApplicationRoutes';

import { useAuth } from 'contexts/AuthContext';

import { ActiveLink } from '../ActiveLink';
import { Popover } from '../Popover';

import {
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
} from './Header.styles';

const Header = (): JSX.Element => {
  const { user, signOut } = useAuth();

  const [initials, setInitials] = useState('');
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);

  useEffect(() => {
    if (user) {
      const fullName = user.name.split(' ');
      const firstInitial = fullName.shift().charAt(0);
      const lastInitial = fullName.length > 1 ? fullName.pop().charAt(0) : '';
      const userInitials = `${firstInitial}${lastInitial}`;
      setInitials(userInitials);

      setIsUserLogged(true);
    } else {
      setIsUserLogged(false);
    }
  }, [user]);

  const content = () => {
    return (
      <PopoverContent>
        <NextLink href={ApplicationRoutes.ADMIN.POKEMONS.LIST}>
          <PopoverContentItem>Admin</PopoverContentItem>
        </NextLink>
        <PopoverContentItem onClick={signOut}>Sair</PopoverContentItem>
      </PopoverContent>
    );
  };

  const handleVisibleChange = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  return (
    <Container>
      <HeaderContent>
        <ProjectName>Reactmon</ProjectName>

        <Menu>
          <ActiveLink href={ApplicationRoutes.ROOT} activeClassName="active">
            <MenuItem>Home</MenuItem>
          </ActiveLink>
          <ActiveLink href={ApplicationRoutes.POKEDEX} activeClassName="active">
            <MenuItem>Pokédex</MenuItem>
          </ActiveLink>
          <ActiveLink href={ApplicationRoutes.ITEMS} activeClassName="active">
            <MenuItem>Itens</MenuItem>
          </ActiveLink>
          <ActiveLink href={ApplicationRoutes.CITIES} activeClassName="active">
            <MenuItem>Cidades</MenuItem>
          </ActiveLink>
        </Menu>

        {isUserLogged ? (
          <Popover
            visible={isPopoverVisible}
            content={content}
            onClose={() => setIsPopoverVisible(false)}
            onVisibleChange={handleVisibleChange}
          >
            <UserInformation>
              <UserName>{user?.name}</UserName>
              <UserAvatar>{initials}</UserAvatar>
              <PopoverIconContainer>
                {isPopoverVisible ? (
                  <FiChevronUp fontSize="1.8rem" />
                ) : (
                  <FiChevronDown fontSize="1.8rem" />
                )}
              </PopoverIconContainer>
            </UserInformation>
          </Popover>
        ) : (
          <NextLink href={ApplicationRoutes.LOGIN}>
            <LoginButton>Entrar</LoginButton>
          </NextLink>
        )}
      </HeaderContent>
    </Container>
  );
};

export default Header;
