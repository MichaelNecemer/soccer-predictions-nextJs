import { checkStatus, getPlayerData } from "@/api";
import { PlayerParams, PlayerResponse } from "@/types/types";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { PlayerSelectField } from "./PlayerSelectField";

type PlayerSelectModalProps = {
  openModal: boolean;
  onClose: () => void;
  players: PlayerResponse[]
  onSelect: (player: PlayerResponse) => void;
};


const PlayerSelectModal: React.FC<PlayerSelectModalProps> = ({
  openModal,
  onClose,
  players, 
  onSelect
}) => {
  if (!openModal) return null;

  const modalRef = useRef<HTMLDialogElement>(null);

   useEffect(() => {
    if (!modalRef.current) {
      return;
    }
    openModal ? modalRef.current.showModal() : modalRef.current.close();
  }, [openModal]);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const handleClose = () => onClose();
    modal.addEventListener("close", handleClose);

    return () => {
      modal.removeEventListener("close", handleClose);
    };
  }, [onClose]);

  return (
    <dialog ref={modalRef} id="my_modal_1" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => modalRef.current?.close()}
          >
            ✕
          </button>
        </form>
        <PlayerSelectField players={players} onSelect={onSelect} />
      </div>
    </dialog>
  );
};

export default PlayerSelectModal;
