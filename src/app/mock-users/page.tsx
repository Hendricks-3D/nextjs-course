import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";

type MockUser = {
  id: number;
  name: string;
};
const url = "https://67807fad85151f714b06e352.mockapi.io/users";
export default async function Users() {
  const authObj = await auth();
  const userObj = await currentUser();

  console.log({ authObj });
  console.log({ userObj });

  const res = await fetch(url);
  const users = await res.json();

  async function addUser(formData: FormData) {
    "use server"; // A directive that tells nextjs that this function should be executed on the server
    const name = formData.get("name");

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const newUser = await res.json();
    console.log(newUser);
    revalidatePath("/mock-users"); // revalidate path so that the user don't have to refresh in order to see when new data is added
  }

  return (
    <div className="py-10">
      <form action={addUser} className="mb-4">
        <input
          type="text"
          name="name"
          required
          className="p-2 mr-2 border border-gray-300 rounded text-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </form>
      <div className="grid grid-cols-4 gap-4 ">
        {users.map((user: MockUser) => (
          <div
            key={user.id}
            className="p-4 bg-white shadow-md rounded-lg text-gray-700"
          >
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
}
