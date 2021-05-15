import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

import { ApplicationRoutes } from 'config/ApplicationRoutes';

import { Form } from 'components/Form';
import { Button } from 'components/Button';
import { Loading } from 'components/Loading';
import { Input } from 'components/Input';
import { Checkbox } from 'components/Checkbox';

import {
  usePokemonId,
  fetchPokemon,
} from 'hooks/reactQuery/pokemons/usePokemonId';
import { useUpdatePokemon } from 'hooks/reactQuery/pokemons/useUpdatePokemon';
import { useTypes } from 'hooks/reactQuery/types/useTypes';

import { useToast } from 'contexts/ToastContext';
import {
  Container,
  Title,
  HeaderContainer,
  StyledLink,
  LoadingOrErrorContainer,
  Image,
  TypesOrWeaknessTitle,
  CheckboxContainer,
  CheckboxError,
} from './EditPokemonAdminPage.styles';
import {
  IEditPokemonAdminPageProps,
  IUpdatePokemonFormData,
} from './EditPokemonAdminPage.types';

const updatePokemonFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  weight: yup.string().required('Peso obrigatório'),
  height: yup.string().required('Altura obrigatória'),
  types: yup.array().min(1, 'Preencha ao menos 1 tipo'),
  weakness: yup.array().min(1, 'Preencha ao menos 1 fraqueza'),
});

export default function EditPokemon({
  id,
  pokemonProps,
}: IEditPokemonAdminPageProps): JSX.Element {
  const { addToast } = useToast();
  const router = useRouter();

  const { data: dataTypes, isLoading: isLoadingTypes } = useTypes();
  const {
    data: dataPokemon,
    isLoading: isLoadingPokemon,
    isError: isErrorPokemon,
  } = usePokemonId({ id, initialData: pokemonProps });
  const { mutateAsync, isLoading: isLoadingUpdatePokemon } = useUpdatePokemon();

  const { register, handleSubmit, formState } = useForm<IUpdatePokemonFormData>(
    {
      resolver: yupResolver(updatePokemonFormSchema),
      defaultValues: {
        types: dataPokemon.types,
        weakness: dataPokemon.weakness,
      },
    },
  );

  const { errors } = formState;

  const handleUpdatePokemon: SubmitHandler<IUpdatePokemonFormData> = async values => {
    try {
      const formData = new FormData();

      const { name, weight, height, types, weakness, image } = values;

      formData.append('name', name);
      formData.append('weight', weight);
      formData.append('height', height);
      formData.append('types', JSON.stringify(types));
      formData.append('weakness', JSON.stringify(weakness));
      formData.append('image', image[0]);
      await mutateAsync({ id, data: formData });

      addToast({
        type: 'success',
        title: 'Pokemon alterado com sucesso',
      });

      router.push(ApplicationRoutes.ADMIN.POKEMONS.LIST);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na alteração',
        description: 'Tente novamente mais tarde',
      });
    }
  };

  return (
    <>
      <Head>
        <title>Editar Pokemon | Reactmon</title>
      </Head>

      <Container>
        <Title>Editando um pokemon</Title>

        <HeaderContainer>
          <Link href={ApplicationRoutes.ADMIN.POKEMONS.LIST}>
            <StyledLink>Voltar</StyledLink>
          </Link>
        </HeaderContainer>

        {isLoadingPokemon ? (
          <LoadingOrErrorContainer>
            <Loading />
          </LoadingOrErrorContainer>
        ) : isErrorPokemon ? (
          <LoadingOrErrorContainer>
            Ocorreu um erro ao carregar pokemons. Tente novamente mais tarde.
          </LoadingOrErrorContainer>
        ) : (
          <Form onSubmit={handleSubmit(handleUpdatePokemon)}>
            <Form.FormItem>
              <Input
                name="name"
                label="Digite o nome do pokemon"
                defaultValue={dataPokemon.name}
                {...register('name')}
                error={errors.name}
              />
            </Form.FormItem>
            <Form.FormItem>
              <Input
                name="weight"
                label="Digite o peso do pokemon (kg)"
                defaultValue={dataPokemon.weight}
                {...register('weight')}
                error={errors.weight}
              />
            </Form.FormItem>
            <Form.FormItem>
              <Input
                name="height"
                label="Digite a altura do pokemon (metros)"
                defaultValue={dataPokemon.height}
                {...register('height')}
                error={errors.height}
              />
            </Form.FormItem>

            {isLoadingTypes ? (
              <LoadingOrErrorContainer>
                <Loading />
              </LoadingOrErrorContainer>
            ) : (
              <>
                <Form.FormItem>
                  <TypesOrWeaknessTitle>
                    Selecione os tipos do pokemon
                  </TypesOrWeaknessTitle>
                  <CheckboxContainer>
                    {dataTypes.map(type => {
                      return (
                        <Checkbox
                          label={type.name}
                          key={type.id}
                          value={type.name}
                          id={`types-${type.name}`}
                          {...register('types')}
                        />
                      );
                    })}
                  </CheckboxContainer>
                  {errors.types && (
                    <CheckboxError>{errors.types.message}</CheckboxError>
                  )}
                </Form.FormItem>
                <Form.FormItem>
                  <TypesOrWeaknessTitle>
                    Selecione as fraquezas do pokemon
                  </TypesOrWeaknessTitle>
                  <CheckboxContainer>
                    {dataTypes.map(weak => (
                      <Checkbox
                        label={weak.name}
                        key={weak.id}
                        value={weak.name}
                        id={`weakness-${weak.name}`}
                        {...register('weakness')}
                      />
                    ))}
                  </CheckboxContainer>
                  {errors.weakness && (
                    <CheckboxError>{errors.weakness.message}</CheckboxError>
                  )}
                </Form.FormItem>
              </>
            )}

            <Form.FormItem>
              {dataPokemon.image && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/files/${dataPokemon.image}`}
                  alt={dataPokemon.name}
                />
              )}
              <Input type="file" name="image" {...register('image')} />
            </Form.FormItem>

            <Form.FormItem>
              <Button type="submit" isLoading={isLoadingUpdatePokemon}>
                Editar
              </Button>
            </Form.FormItem>
          </Form>
        )}
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;

  const pokemonProps = await fetchPokemon({ id });

  return {
    props: { pokemonProps, id },
  };
};
