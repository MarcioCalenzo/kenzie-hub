import Modal from "../modal";
import { ModalTechBox } from "./stlye";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export interface iAddTech {
  title: string;
  status: string;
}
interface iSetModalToogle {
  setTechModalToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalAddTech({ setTechModalToggle }: iSetModalToogle) {
  const { addTech } = useContext(AuthContext);

  const TechCreateSchema = yup.object({
    title: yup.string().required("Titulo é obrigatório"),
    status: yup.string().required("Status é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<iAddTech>({
    resolver: yupResolver(TechCreateSchema),
  });
  return (
    <Modal title="Cadastrar Tecnologia" setModalToggle={setTechModalToggle}>
      <ModalTechBox>
        <form onSubmit={handleSubmit(addTech)}>
          <div className="input-box">
            <label>Nome</label>
            <input
              type="text"
              {...register("title")}
              placeholder="Digite o titulo"
            />
            <span>{errors.title?.message}</span>
          </div>
          <div className="input-box">
            <label>Selecionar status</label>
            <select id="" {...register("status")}>
              <option value="" hidden>
                Selecione um módulo
              </option>
              <option value="Iniciante">Iniciante</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
            <span>{errors.status?.message}</span>
          </div>
          <button type="submit">Cadastrar Tecnologia</button>
        </form>
      </ModalTechBox>
    </Modal>
  );
}
