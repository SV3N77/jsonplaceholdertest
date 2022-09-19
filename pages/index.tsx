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

      <header className="bg-teal-100 p-4">
        <div className="mx-auto container text-2xl">Contacts</div>
      </header>
      <main className="py-8 bg-slate-50">
        <div className="mx-auto container">
          <section className="flex flex-col gap-4">
            <div className="text-xl px-4">Names</div>
            <div className="flex flex-col bg-teal-50">
              {users.map((user) => (
                <ContactCards
                  key={user.id}
                  name={user.name}
                  email={user.email}
                  address={user.address}
                  phone={user.phone}
                  website={user.website}
                  company={user.company}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;

// internal components

type ContactCardProps = {
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    bs: string;
  };
};

function ContactCards({
  name,
  email,
  address,
  phone,
  website,
  company,
}: ContactCardProps) {
  return (
    <li className="w-full item shadow-sm">
      <input type="checkbox" id={name} className="peer appearance-none" />
      <i className="fa-solid fa-chevron-right peer-checked:hidden inline"></i>
      <i className="fa-solid fa-chevron-down peer-checked:inline hidden"></i>
      <label htmlFor={name} className="py-4 cursor-pointer grow">
        <p className="text-base">{name}</p>
      </label>
      <div className="content text-sm">
        <div className="flex gap-2 p-4 justify-between">
          <div className="flex flex-col gap-2">
            <div>Email: {email}</div>
            <div>Phone: {phone}</div>
            <div>Website: {website}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              Address:{" "}
              {address.suite +
                " " +
                address.street +
                " " +
                address.city +
                " " +
                address.zipcode}
            </div>
            <div>Company: {company.name}</div>
            <div className="capitalize">{company.bs}</div>
          </div>
        </div>
      </div>
    </li>
  );
}
