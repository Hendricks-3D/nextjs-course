type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

export default async function UserServer() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  return (
    <ul>
      {users.map((user: User) => (
        <li
          key={user.id}
          className="p-4 m-4 bg-white shadow-md rounded-lg text-gray-700"
        >
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
}
