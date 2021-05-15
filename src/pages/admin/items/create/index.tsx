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
import { Textarea } from 'components/Textarea';

import { useToast } from 'contexts/ToastContext';

import { useCreateItem } from 'hooks/reactQuery/items/useCreateItem';

import {
  Container,
  Title,
  HeaderContainer,
  StyledLink,
} from './CreateItemAdminPage.styles';
import { ICreateItemFormData } from './CreateItemAdminPage.types';

const createItemFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  description: yup.string().required('Descrição obrigatória'),
  function: yup.string().required('Função obrigatória'),
});

export default function CreateItem(): JSX.Element {
  const { addToast } = useToast();
  const router = useRouter();
  const { mutateAsync, isLoading } = useCreateItem();

  const { register, handleSubmit, formState } = useForm<ICreateItemFormData>({
    resolver: yupResolver(createItemFormSchema),
  });

  const { errors } = formState;

  const handleCreateItem: SubmitHandler<ICreateItemFormData> = async values => {
    try {
      const formData = new FormData();

      const { name, description, function: itemFunction, image } = values;

      formData.append('name', name);
      formData.append('description', description);
      formData.append('function', itemFunction);
      formData.append('image', image[0]);
      await mutateAsync({ data: formData });

      addToast({
        type: 'success',
        title: 'Item criado com sucesso',
      });

      router.push(ApplicationRoutes.ADMIN.ITEMS.LIST);
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
        <title>Criar Item | Reactmon</title>
      </Head>

      <Container>
        <Title>Crie um novo item</Title>

        <HeaderContainer>
          <Link href={ApplicationRoutes.ADMIN.ITEMS.LIST}>
            <StyledLink>Voltar</StyledLink>
          </Link>
        </HeaderContainer>

        <Form onSubmit={handleSubmit(handleCreateItem)}>
          <Form.FormItem>
            <Input
              name="name"
              label="Digite o nome do item"
              {...register('name')}
              error={errors.name}
            />
          </Form.FormItem>
          <Form.FormItem>
            <Textarea
              name="description"
              label="Digite a descrição do item"
              {...register('description')}
              error={errors.description}
            />
          </Form.FormItem>
          <Form.FormItem>
            <Textarea
              name="function"
              label="Digite a função do item"
              {...register('function')}
              error={errors.function}
            />
          </Form.FormItem>
          <Form.FormItem>
            <Input type="file" name="image" {...register('image')} />
          </Form.FormItem>

          <Form.FormItem>
            <Button type="submit" isLoading={isLoading}>
              Criar
            </Button>
          </Form.FormItem>
        </Form>
      </Container>
    </>
  );
}
