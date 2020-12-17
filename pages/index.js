import Head from "next/head";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Well done</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="content">
        <section>
          <h1>Welcome MyLocals demopage</h1>
        </section>
      </main>
    </Layout>
  );
}
