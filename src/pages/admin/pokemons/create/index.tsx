import Head from 'next/head';
import Link from 'next/link';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

import { ApplicationRoutes } from 'config/ApplicationRoutes';

import { Form } from 'components/Form';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Checkbox } from 'components/Checkbox';
import { Loading } from 'components/Loading';

import { useToast } from 'contexts/ToastContext';

import { useCreatePokemon } from 'hooks/reactQuery/pokemons/useCreatePokemon';
import { useTypes } from 'hooks/reactQuery/types/useTypes';

import {
  Container,
  Title,
  HeaderContainer,
  StyledLink,
  CheckboxContainer,
  LoadingOrErrorContainer,
  TypesOrWeaknessTitle,
  CheckboxError,
} from './CreatePokemonAdminPage.styles';
import { ICreatePokemonFormData } from './CreatePokemonAdminPage.types';

const createPokemonFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  weight: yup.string().required('Peso obrigatório'),
  height: yup.string().required('Altura obrigatória'),
  types: yup.array().min(1, 'Preencha ao menos 1 tipo'),
  weakness: yup.array().min(1, 'Preencha ao menos 1 fraqueza'),
});

export default function CreatePokemon(): JSX.Element {
  const { addToast } = useToast();
  const router = useRouter();
  const { mutateAsync, isLoading: isLoadingCreatePokemon } = useCreatePokemon();
  const { data, isLoading: isLoadingTypes } = useTypes();

  const { register, handleSubmit, formState } = useForm<ICreatePokemonFormData>(
    {
      resolver: yupResolver(createPokemonFormSchema),
      defaultValues: {
        types: [],
        weakness: [],
      },
    },
  );

  const { errors } = formState;

  const handleCreatePokemon: SubmitHandler<ICreatePokemonFormData> = async values => {
    try {
      const formData = new FormData();

      const { name, weight, height, types, weakness, image } = values;

      formData.append('name', name);
      formData.append('weight', weight);
      formData.append('height', height);
      formData.append('types', JSON.stringify(types));
      formData.append('weakness', JSON.stringify(weakness));
      formData.append('image', image[0]);
      await mutateAsync({ data: formData });

      addToast({
        type: 'success',
        title: 'Pokemon criado com sucesso',
      });

      router.push(ApplicationRoutes.ADMIN.POKEMONS.LIST);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na criação',
        description: 'Tente novamente mais tarde',
      });
    }
  };

  return (
    <>
      <Head>
        <title>Criar Pokemon | Reactmon</title>
      </Head>

      <Container>
        <Title>Crie um novo pokemon</Title>

        <HeaderContainer>
          <Link href={ApplicationRoutes.ADMIN.POKEMONS.LIST}>
            <StyledLink>Voltar</StyledLink>
          </Link>
        </HeaderContainer>

        <Form onSubmit={handleSubmit(handleCreatePokemon)}>
          <Form.FormItem>
            <Input
              name="name"
              label="Digite o nome do pokemon"
              {...register('name')}
              error={errors.name}
            />
          </Form.FormItem>
          <Form.FormItem>
            <Input
              name="weight"
              label="Digite o peso do pokemon (kg)"
              {...register('weight')}
              error={errors.weight}
            />
          </Form.FormItem>
          <Form.FormItem>
            <Input
              name="height"
              label="Digite a altura do pokemon (metros)"
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
                  {data.map(type => (
                    <Checkbox
                      label={type.name}
                      key={type.id}
                      value={type.name}
                      id={`types-${type.name}`}
                      {...register('types')}
                    />
                  ))}
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
                  {data.map(weak => (
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
            <Input type="file" name="image" {...register('image')} />
          </Form.FormItem>

          <Form.FormItem>
            <Button type="submit" isLoading={isLoadingCreatePokemon}>
              Criar
            </Button>
          </Form.FormItem>
        </Form>
      </Container>
    </>
  );
}
