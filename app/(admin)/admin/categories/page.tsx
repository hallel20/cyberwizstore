import NewCategoryModal from "@/components/NewCategoryModal";
import { getCategories } from "@/lib/data";
import DeleteCategory from "@/components/DeleteCategory";

const CategoriesPage = async () => {
  const categories = await getCategories();
  //   console.log(categories);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-3xl font-semibold py-4">Categories</h2>
        <NewCategoryModal />
      </div>
      <table className="flex flex-col">
        <thead>
          <tr className="flex w-100 bg-slate-500 font-semibold text-white sm:text-base">
            <td className="py-3 w-6/12">Category</td>
            <td className="py-3 w-4/12">Slug</td>
            <td className="py-3 w-2/12">Action</td>
          </tr>
        </thead>
        <tbody>
          {categories!.map((category: any) => (
            <tr
              className="flex w-100 sm:text-base items-center"
              key={category._id}
            >
              <td className="py-3 w-6/12">{category.name}</td>
              <td className="py-3 w-4/12">{category.slug}</td>
              <td className="py-3 w-2/12">
                <DeleteCategory
                  category={category._id.toString()}
                  name={category.name}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesPage;
