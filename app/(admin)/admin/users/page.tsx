import DeleteUser from "@/components/users/DeleteUser";
import NewUserModal from "@/components/users/NewUserModal";
import { getUsers } from "@/lib/data";
import Link from "next/link";

const Users = async () => {
  try {
    const users = await getUsers();
    return (
      <div className="px-4">
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-3xl font-semibold py-4">Products</h2>
          <NewUserModal />
        </div>
        <table className="flex flex-col">
          <thead>
            <tr className="flex w-100 bg-slate-500 font-semibold text-white sm:text-base">
              <td className="py-3 md:w-4/12 w-8/12">User</td>
              <td className="py-3 md:w-3/12 w-4/12">Email</td>
              <td className="py-3 w-2/12 hidden md:block">Role</td>
              <td className="py-3 w-3/12 hidden md:block">Actions</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="flex w-100 sm:text-base" key={user.id}>
                <td className="md:w-4/12 w-8/12">
                  <Link
                    href={`/admin/products/${user._id.toString()}`}
                    className="flex items-center"
                  >
                    {user.name}
                  </Link>
                </td>
                <td className="md:w-3/12 w-4/12 flex items-center">
                  ${user.email}
                </td>
                <td className="w-2/12 hidden md:flex items-center">
                  {user.role}
                </td>
                <td className="w-3/12 hidden md:flex items-center justify-between">
                  <Link href={`/admin/products/${user._id.toString()}`}>
                    <button className="bg-sky-500 rounded-md px-3 py-1 text-white text-xs">
                      View
                    </button>
                  </Link>
                  <DeleteUser userId={user._id.toString()} name={user.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (ex) {
    console.log(ex);
    return (
      <div className="px-4">
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-3xl font-semibold py-4">Products</h2>
          <NewUserModal />
        </div>
        <table className="flex flex-col">
          <thead>
            <tr className="flex w-100 bg-slate-500 font-semibold text-white sm:text-base">
              <td className="py-3 md:w-4/12 w-8/12">User</td>
              <td className="py-3 md:w-3/12 w-4/12">Email</td>
              <td className="py-3 w-2/12 hidden md:block">Role</td>
              <td className="py-3 w-3/12 hidden md:block">Actions</td>
            </tr>
          </thead>
          <tbody>
            <h2 className="text-3xl">There are no users yet!</h2>
          </tbody>
        </table>
      </div>
    );
  }
};

export default Users;
