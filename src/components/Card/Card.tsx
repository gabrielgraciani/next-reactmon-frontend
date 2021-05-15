import Link from 'next/link';

import { formatHeight } from 'helpers/formatHeight';
import { formatLowerCase } from 'helpers/formatLowerCase';
import { formatWeight } from 'helpers/formatWeight';

import {
  Container,
  ImageContainer,
  Image,
  ContentContainer,
  Types,
  TypeItem,
  TypeText,
  Name,
  Specifications,
} from './Card.styles';
import { ICardProps } from './Card.types';
import CardSpecificationItem from './CardSpecificationItem';

const Card = ({ pokemon }: ICardProps): JSX.Element => {
  return (
    <Link href={`/pokedex/${pokemon.id}`}>
      <Container type={formatLowerCase(pokemon.main_type)}>
        <ImageContainer>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/files/${pokemon.image}`}
            alt={pokemon.name}
          />
        </ImageContainer>
        <ContentContainer>
          <Types>
            {pokemon.types.map(type => (
              <TypeItem type={formatLowerCase(type)} key={type}>
                <TypeText>{type}</TypeText>
              </TypeItem>
            ))}
          </Types>

          <Name>{pokemon.name}</Name>

          <Specifications>
            <CardSpecificationItem
              title="Peso"
              value={formatWeight(pokemon.weight)}
            />
            <CardSpecificationItem
              title="Altura"
              value={formatHeight(pokemon.height)}
            />
            <CardSpecificationItem
              title="Fraquezas"
              value={pokemon.weakness.map(weak => weak).join(', ')}
            />
          </Specifications>
        </ContentContainer>
      </Container>
    </Link>
  );
};

export default Card;
