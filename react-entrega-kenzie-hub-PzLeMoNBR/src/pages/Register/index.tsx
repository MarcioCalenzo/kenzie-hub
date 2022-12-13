import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "react-toastify/dist/ReactToastify.css";

import {
  Container,
  Header,
  DivForm,
  Form,
  DivTittle,
  ButtonLink,
} from "../../components/register";

export interface iRegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio: string;
  contact: string;
  course_module: string;
}

const schema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup
    .string()
    .email("Tem que ser um email válido")
    .required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha precisa de no minimo 6 digitos")
    .required("Senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Ambas as senhas tem que ser iguais"),
  bio: yup.string().required("Bio é obrigatória"),
  contact: yup.string().required("Contato é obrigatório"),
  course_module: yup.string().required("Modulo é obrigatório"),
});

export default function Register() {
  const { registerUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<iRegisterForm>({
    resolver: yupResolver(schema),
  });

  return (
    <Container>
      <Header>
        <h2>Kenzie Hub</h2>
        <ButtonLink to={"/"}>Voltar</ButtonLink>
      </Header>
      <DivForm>
        <DivTittle>
          <h2>Crie sua conta</h2>
          <p>Rapido e grátis, vamos nessa</p>
        </DivTittle>

        <Form onSubmit={handleSubmit(registerUser)}>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            placeholder="Digite aqui seu nome"
            {...register("name")}
          />
          <span>{errors.name?.message}</span>

          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Digite aqui seu email"
            {...register("email")}
          />
          <span>{errors.email?.message}</span>

          <label htmlFor="password">Senha</label>
          <input
            type="password"
            placeholder="Digite aqui sua senha"
            {...register("password")}
          />
          <span>{errors.password?.message}</span>

          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            placeholder="Digite novamente sua senha"
            {...register("confirmPassword")}
          />
          <span>{errors.confirmPassword?.message}</span>

          <label htmlFor="bio">Bio</label>
          <input
            type="text"
            placeholder="Fale sobre você"
            {...register("bio")}
          />
          <span>{errors.bio?.message}</span>

          <label htmlFor="contact">Contato</label>
          <input
            type="text"
            placeholder="Opção de contato"
            {...register("contact")}
          />
          <span>{errors.contact?.message}</span>

          <label htmlFor="course_module">Selecionar módulo</label>
          <select id="" {...register("course_module")}>
            <option value="" hidden>
              Selecione um módulo
            </option>
            <option value="Primeiro módulo (Introdução ao Frontend)">
              Primeiro módulo (Introdução ao Frontend)
            </option>
            <option value="Segundo módulo (Frontend Avançado)">
              Segundo módulo (Frontend Avançado)
            </option>
            <option value="Terceiro módulo (Introdução ao Backend)">
              Terceiro módulo (Introdução ao Backend)
            </option>
            <option value="Quarto módulo (Backend Avançado)">
              Quarto módulo (Backend Avançado)
            </option>
          </select>
          <span>{errors.course_module?.message}</span>

          <button type="submit">Cadastrar</button>
        </Form>
      </DivForm>
    </Container>
  );
}
