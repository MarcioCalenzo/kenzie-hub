import { ModalBackground, ModalMain } from "./stlye";

interface iModal {
  setModalToggle: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ title, setModalToggle, children }: iModal) {
  const closeModal = () => setModalToggle(false);

  return (
    <ModalBackground>
      <ModalMain>
        <div className="modalTexto">
          <h1>{title}</h1>
          <span onClick={closeModal}>X</span>
        </div>
        <div className="content">{children}</div>
      </ModalMain>
    </ModalBackground>
  );
}
