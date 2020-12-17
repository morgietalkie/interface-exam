import Head from "next/head";
import Layout from "../components/Layout";

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>Contact</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="content">
        <section>
          <h1>Contact page</h1>
        </section>
      </main>
    </Layout>
  );
}
