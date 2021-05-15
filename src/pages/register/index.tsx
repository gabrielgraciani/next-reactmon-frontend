import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

import { Input } from 'components/Input';
import { Button } from 'components/Button';
import { Form } from 'components/Form';

import { ApplicationRoutes } from 'config/ApplicationRoutes';

import { useToast } from 'contexts/ToastContext';

import { api } from 'services/api';

import { Container, Title, Text, CreateAccount } from './RegisterPage.styles';
import { IRegisterFormData } from './RegisterPage.types';

const registerFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
});

export default function Register(): JSX.Element {
  const { addToast } = useToast();
  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState } = useForm<IRegisterFormData>({
    resolver: yupResolver(registerFormSchema),
  });

  const { errors } = formState;

  const handleRegister: SubmitHandler<IRegisterFormData> = async values => {
    setIsLoading(true);
    try {
      const { email, password, name } = values;
      await api.post('users', {
        email,
        password,
        name,
      });

      setIsLoading(false);
      addToast({
        title: 'Sucesso no registro',
        description: 'Usuário criado com sucesso!',
      });
      push(ApplicationRoutes.LOGIN);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no registro',
        description: 'Tente novamente mais tarde',
      });

      setIsLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Crie sua conta | Reactmon</title>
      </Head>

      <Container>
        <Title>Crie sua conta</Title>

        <Form onSubmit={handleSubmit(handleRegister)}>
          <Form.FormItem>
            <Input
              name="name"
              label="Digite seu nome"
              {...register('name')}
              error={errors.name}
            />
          </Form.FormItem>
          <Form.FormItem>
            <Input
              name="email"
              type="email"
              label="Digite seu e-mail"
              {...register('email')}
              error={errors.email}
            />
          </Form.FormItem>
          <Form.FormItem>
            <Input
              name="password"
              label="Digite sua senha"
              type="password"
              {...register('password')}
              error={errors.password}
            />
          </Form.FormItem>
          <Form.FormItem>
            <Input
              name="password_confirmation"
              label="Confirme sua senha"
              type="password"
              {...register('password_confirmation')}
              error={errors.password_confirmation}
            />
          </Form.FormItem>

          <Form.FormItem>
            <Button type="submit" isLoading={isLoading}>
              Criar
            </Button>
          </Form.FormItem>
        </Form>

        <Text>
          Já possui uma conta?
          <Link href={ApplicationRoutes.LOGIN}>
            <CreateAccount> Entre agora</CreateAccount>
          </Link>
        </Text>
      </Container>
    </>
  );
}
