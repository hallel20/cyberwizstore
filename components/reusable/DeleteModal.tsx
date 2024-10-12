import { Dispatch, SetStateAction } from "react";
import OverlayModal from "./OverlayModal";
import Spinner from "./Spinner";

interface Props {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  action: VoidFunction;
  loading: boolean;
  value: string;
  name?: string;
}

const DeleteModal = ({
  modalOpen,
  setModalOpen,
  action,
  loading,
  value,
  name,
}: Props) => {
  return (
    <OverlayModal open={modalOpen} setOpen={setModalOpen} small>
      <div className="text-xl text-center">
        Are you sure you want to Delete {name}?
      </div>
      <div className="flex justify-between gap-3 mt-10">
        <button
          className="flex items-center gap-1 text-slate-900 rounded-md px-5 py-2 max-h-max transition ease-in-out bg-slate-300"
          onClick={() => setModalOpen(false)}
        >
          Close
        </button>
        <form action={action}>
          <input type="hidden" name="id" value={value} />
          <button className="flex items-center gap-1 text-slate-100 rounded-md px-5 py-2 max-h-max transition ease-in-out bg-red-600">
            Delete{loading && <Spinner />}
          </button>
        </form>
      </div>
    </OverlayModal>
  );
};

export default DeleteModal;
