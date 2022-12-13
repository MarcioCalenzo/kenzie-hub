import { createContext, useEffect, useState } from "react";
import Api from "../services";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";
import { AxiosError } from "axios";

import { iLoginForm } from "../pages/Login";
import { iRegisterForm } from "../pages/Register";
import { iAddTech } from "../components/modalAddTech";

interface iUserProviderProps {
  children: React.ReactNode;
}

interface iUserContext {
  user: iUser | null;
  loading: boolean;
  userTechs: iTech[];
  techModalToggle: boolean;
  setTechModalToggle: React.Dispatch<React.SetStateAction<boolean>>;
  logUser: (obj: iLoginForm) => void;
  registerUser: (obj: iRegisterForm) => void;
  logoutDash: () => void;
  addTech: (obj: iAddTech) => void;
  removeTech: (id: string) => void;
}

interface iPostUser {
  token: string;
  user: iUser;
}
interface iUser {
  id: string;
  name: string;
  email: string;
  course_module: string;
  bio: string;
  contact: string;
  created_at: string;
  updated_at: string;
  techs: iTech[];
  works: iWork[];
  avatar_url: string;
  token: string;
}

interface iTech {
  id: string;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface iWork {
  id: string;
  title: string;
  description: string;
  deploy_url: string;
  created_at: string;
  updated_at: string;
}

interface iAxiosErr {
  error: string;
  message: string;
}

export const AuthContext = createContext({} as iUserContext);

export default function AuthProvider({ children }: iUserProviderProps) {
  const [user, setUser] = useState<iUser | null>(null);
  const [userTechs, setUserTechs] = useState([] as iTech[]);
  const [loading, setLoading] = useState(true);
  const [techModalToggle, setTechModalToggle] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("@kenzieHub:TOKEN");

      if (token) {
        try {
          Api.defaults.headers.authorization = `Bearer ${token}`;

          const { data } = await Api.get<iUser>("/profile");

          console.log(data);

          setUser(data);

          setUserTechs(data.techs);
        } catch (error) {
          const requestError = error as AxiosError<iAxiosErr>;
          console.error(requestError);
        }

        setLoading(false);
      }
    }

    loadUser();
  }, [loading]);

  function logoutDash() {
    localStorage.removeItem("@kenzieHub:TOKEN");
    localStorage.removeItem("@kenzieHub:USERID");

    setUser(null);
    navigate("/");
  }

  async function logUser(obj: iLoginForm) {
    // reset();
    try {
      const { data } = await Api.post<iPostUser>("/sessions", obj);

      console.log(data);
      localStorage.setItem("@kenzieHub:TOKEN", data.token);
      localStorage.setItem("@kenzieHub:USERID", data.user.id);
      setUser(data.user);
      setUserTechs(data.user.techs);

      toast.success(
        "Seu login foi realizado com sucesso , estaremos te encaminhando para o nosso Hub !",
        {
          theme: "dark",
          autoClose: 3000,
        }
      );

      setLoading(false);
    } catch (error) {
      toast.error("Erro ao realizar o login do usuario. Tente novamente", {
        theme: "dark",
      });
    }
  }

  async function registerUser(obj: iRegisterForm) {
    // reset()

    try {
      const { data } = await Api.post<iPostUser>("/users", obj);

      toast.success(
        "Usuario criado com sucesso , voce esta sendo redirecionado para a pagina de login !",
        {
          theme: "dark",
          autoClose: 3000,
        }
      );
      setTimeout(() => {
        navigate("/");
      }, 4000);
    } catch (error) {
      const requestError = error as AxiosError<iAxiosErr>;
      if (requestError.response?.data.message === "Email already exists") {
        toast.error("Esse email ja existe", {
          theme: "dark",
        });
      } else {
        toast.error(
          "Infelizmentes estamos com problemas , tente novamente mais tarde",
          {
            theme: "dark",
          }
        );
      }
    }
  }
  async function addTech(obj: iAddTech) {
    try {
      const { data } = await Api.post<iPostUser>("/users/techs", obj);

      getTechs();
      setTechModalToggle(false);

      toast.success("Tecnologia adicionada com sucesso", {
        theme: "dark",
        autoClose: 3000,
      });
    } catch (error) {
      const requestError = error as AxiosError<iAxiosErr>;
      if (
        requestError.response?.data.message ===
        "User Already have this technology created you can only update it"
      ) {
        toast.error("Ja existe uma tecnologia com o mesmo nome !", {
          theme: "dark",
          autoClose: 5000,
        });
      } else {
        toast.error(
          "Infelizmentes estamos com problemas , tente novamente mais tarde",
          {
            theme: "dark",
            autoClose: 5000,
          }
        );
      }
    }
  }
  async function removeTech(id: string) {
    try {
      const data = await Api.delete(`/users/techs/${id}`);

      getTechs();

      toast.success("Tecnologia removida com sucesso", {
        theme: "dark",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(
        "Infelizmentes estamos com problemas , tente novamente mais tarde",
        {
          theme: "dark",
          autoClose: 5000,
        }
      );
    }
  }

  async function getTechs() {
    try {
      const { data } = await Api.get<iUser>("/profile");

      // console.log(data);

      if (userTechs) {
        return setUserTechs(data.techs);
      }
    } catch (error) {
      toast.error(
        "Infelizmentes estamos com problemas , tente novamente mais tarde",
        {
          theme: "dark",
          autoClose: 5000,
        }
      );
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userTechs,
        techModalToggle,
        setTechModalToggle,
        logUser,
        registerUser,
        logoutDash,
        addTech,
        removeTech,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
