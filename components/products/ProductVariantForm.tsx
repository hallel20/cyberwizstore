import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import OverlayModal from "../reusable/OverlayModal";
import { Dispatch, SetStateAction } from "react";
import { FaPlus } from "react-icons/fa6";
import { addProductVariants } from "@/lib/actions";

interface Variant {
  variantName: string;
  variantOption: string;
  priceModifier: number;
  stock: number;
}

interface ProductVariantsForm {
  _id: string;
  variants: Variant[];
}

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  productId: string;
}

const ProductVariantForm = ({ open, setOpen, productId }: Props) => {
  const { register, control, handleSubmit, reset } =
    useForm<ProductVariantsForm>({
      defaultValues: {
        variants: [
          { variantName: "", variantOption: "", priceModifier: 0, stock: 0 },
        ],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit: SubmitHandler<ProductVariantsForm> = async (data) => {
    console.log(data);
    try {
      await addProductVariants(data);
      reset();
      setOpen(false);
    } catch (ex) {
      console.error("Error", ex);
    }
  };
  return (
    <OverlayModal open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4 className="text-3xl font-semibold mb-10">Add a product Variant</h4>
        <input type="hidden" {...register("_id")} value={productId} />
        {fields.map((field, i) => (
          <div key={i}>
            <div className="rounded flex gap-1 justify-between">
              <label className="flex w-3/12 flex-col gap-2">
                Name:
                <input
                  type="text"
                  {...register(`variants.${i}.variantName`)}
                  placeholder="Color"
                  className="p-3 bg-slate-100 rounded-lg focus:outline-none border text-base font-extralight border-slate-300"
                />
              </label>
              <label className="flex w-3/12 flex-col gap-2">
                Option:
                <input
                  type="text"
                  {...register(`variants.${i}.variantOption`)}
                  placeholder="Brown"
                  className="p-3 bg-slate-100 rounded-lg focus:outline-none border text-base font-extralight border-slate-300"
                />
              </label>
              <label className="flex w-2/12 flex-col gap-2">
                Modifier:
                <input
                  type="number"
                  {...register(`variants.${i}.priceModifier`)}
                  placeholder="2"
                  className="p-3 bg-slate-100 rounded-lg focus:outline-none border text-base font-extralight border-slate-300"
                />
              </label>
              <label className="flex w-2/12 flex-col gap-2">
                Stock:
                <input
                  type="number"
                  {...register(`variants.${i}.stock`)}
                  placeholder="11"
                  className="p-3 bg-slate-100 rounded-lg focus:outline-none border text-base font-extralight border-slate-300"
                />
              </label>
            </div>
            <div className="justify-end flex mt-2">
              <button
                className="px-3 py-1 rounded-md bg-red-500 max-h-max text-white text-sm"
                type="button"
                onClick={() => remove(i)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="flex flex-col">
          <button
            className="bg-sky-500 p-1 rounded-full text-white max-w-max"
            type="button"
            onClick={() =>
              append({
                variantName: "",
                variantOption: "",
                priceModifier: 0,
                stock: 0,
              })
            }
          >
            <FaPlus size="20" />
          </button>
          <div className="text-center">
            <button
              type="submit"
              className="max-w-max bg-green-600 text-white px-3 py-1 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </OverlayModal>
  );
};

export default ProductVariantForm;
