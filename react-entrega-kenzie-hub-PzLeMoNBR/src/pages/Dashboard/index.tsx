import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Container, Header, Main, Nav } from "../../components/dashboard";
import ModalAddTech from "../../components/modalAddTech";
import { FaTrash } from "react-icons/fa";

export default function Dashboard() {
  const {
    user,
    loading,
    logoutDash,
    userTechs,
    removeTech,
    techModalToggle,
    setTechModalToggle,
  } = useContext(AuthContext);

  const openModalTechNew = () => setTechModalToggle(true);

  if (loading) {
    return null;
  }

  return (
    <>
      {user ? (
        <>
          {techModalToggle && (
            <ModalAddTech setTechModalToggle={setTechModalToggle} />
          )}
          <Container>
            <Header>
              <h2>Kenzie Hub</h2>
              <button onClick={logoutDash}>Sair</button>
            </Header>
            <hr />
            <Nav>
              <h2>Olá , {user.name}</h2>
              <h4>{user.course_module}</h4>
            </Nav>
            <hr />
            <Main>
              {/*   <h2>Que pena! Estamos em desenvolvimento :(</h2>
                    <h3>Nossa aplicação está em desenvolvimento, em breve teremos novidades</h3>
              */}
              <div className="headerTech">
                <h2>Tecnologias</h2>
                <button onClick={openModalTechNew}>+</button>
              </div>

              {userTechs.length >= 1 ? (
                <ul className="techsList">
                  {userTechs.map((elem, index) => (
                    <li key={index}>
                      <h3>{elem.title}</h3>
                      <p>{elem.status}</p>
                      <button id={elem.id} onClick={() => removeTech(elem.id)}>
                        <FaTrash />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="listEmpty">
                  <h2>
                    Que pena! Voce ainda não tem nehuma Tecnologia na sua conta
                    :(
                  </h2>
                  <h3>Pode estar adicionando ao clicar no +</h3>
                </div>
              )}
            </Main>
          </Container>
        </>
      ) : (
        <Navigate to={"/"} replace />
      )}
    </>
  );
}
