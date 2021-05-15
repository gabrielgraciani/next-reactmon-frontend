import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

import { ApplicationRoutes } from 'config/ApplicationRoutes';

import { useItemId, fetchItem } from 'hooks/reactQuery/items/useItemId';
import { useUpdateItem } from 'hooks/reactQuery/items/useUpdateItem';

import { Form } from 'components/Form';
import { Button } from 'components/Button';
import { Loading } from 'components/Loading';
import { Input } from 'components/Input';
import { Textarea } from 'components/Textarea';

import { useToast } from 'contexts/ToastContext';
import {
  Container,
  Title,
  HeaderContainer,
  StyledLink,
  LoadingOrErrorContainer,
  Image,
} from './EditItemAdminPage.styles';
import {
  IUpdateItemFormData,
  IEditItemAdminPageProps,
} from './EditItemAdminPage.types';

const updateItemFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  description: yup.string().required('Descrição obrigatória'),
  function: yup.string().required('Função obrigatória'),
});

export default function EditItem({
  id,
  itemProps,
}: IEditItemAdminPageProps): JSX.Element {
  const { addToast } = useToast();
  const router = useRouter();

  const { data, isLoading: isLoadingItemId, isError } = useItemId({
    id,
    initialData: itemProps,
  });
  const { mutateAsync, isLoading: isLoadingUpdateItem } = useUpdateItem();

  const { register, handleSubmit, formState } = useForm<IUpdateItemFormData>({
    resolver: yupResolver(updateItemFormSchema),
  });

  const { errors } = formState;

  const handleUpdateItem: SubmitHandler<IUpdateItemFormData> = async values => {
    try {
      const formData = new FormData();

      const { name, description, function: itemFunction, image } = values;

      formData.append('name', name);
      formData.append('description', description);
      formData.append('function', itemFunction);
      formData.append('image', image[0]);
      await mutateAsync({ id, data: formData });

      addToast({
        type: 'success',
        title: 'Item alterado com sucesso',
      });

      router.push(ApplicationRoutes.ADMIN.ITEMS.LIST);
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
        <title>Editar Item | Reactmon</title>
      </Head>

      <Container>
        <Title>Editando um item</Title>

        <HeaderContainer>
          <Link href={ApplicationRoutes.ADMIN.ITEMS.LIST}>
            <StyledLink>Voltar</StyledLink>
          </Link>
        </HeaderContainer>

        {isLoadingItemId ? (
          <LoadingOrErrorContainer>
            <Loading />
          </LoadingOrErrorContainer>
        ) : isError ? (
          <LoadingOrErrorContainer>
            Ocorreu um erro ao carregar item. Tente novamente mais tarde.
          </LoadingOrErrorContainer>
        ) : (
          <Form onSubmit={handleSubmit(handleUpdateItem)}>
            <Form.FormItem>
              <Input
                name="name"
                label="Digite o nome do item"
                defaultValue={data.name}
                {...register('name')}
                error={errors.name}
              />
            </Form.FormItem>
            <Form.FormItem>
              <Textarea
                name="description"
                label="Digite a descrição do item"
                defaultValue={data.description}
                {...register('description')}
                error={errors.description}
              />
            </Form.FormItem>
            <Form.FormItem>
              <Textarea
                name="function"
                label="Digite a função do item"
                defaultValue={data.function}
                {...register('function')}
                error={errors.function}
              />
            </Form.FormItem>
            <Form.FormItem>
              {data.image && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/files/${data.image}`}
                  alt={data.name}
                />
              )}
              <Input type="file" name="image" {...register('image')} />
            </Form.FormItem>

            <Form.FormItem>
              <Button type="submit" isLoading={isLoadingUpdateItem}>
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

  const itemProps = await fetchItem({ id });

  return {
    props: { itemProps, id },
  };
};
