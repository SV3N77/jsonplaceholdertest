import Head from "next/head";
import { User } from "../util/User";

type UserProps = {
  users: User[];
};

export async function getStaticProps() {
  const users = (await fetch("https://jsonplaceholder.typicode.com/users").then(
    (res) => res.json()
  )) as User[];

  return {
    props: {
      users,
    },
  };
}

function Home({ users }: UserProps) {
  return (
    <div>
      <Head>
        <title>Jsonplaceholdertest</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-amber-50 p-4">
        <div className="mx-auto container text-2xl">Jsonplaceholder Users</div>
      </header>
      <main className="py-8">
        <div className="mx-auto container">
          <section className="flex flex-col gap-4">
            <div className="text-xl ">Users</div>
            {users.map((user) => (
              <div key={user.id} className="text-sm">
                {user.name}
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;
