import { JSX } from "solid-js";
import Nav from "~/components/Nav";
import Footer from "~/components/Footer";


export default function BaseLayout({ children }: { children: JSX.Element }) {
  return (
    <div class="flex flex-col min-h-screen">
      <Nav />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}