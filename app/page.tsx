import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="flex min-h-screen items-center justify-center pt-24">
          <h1 className="font-sans text-2xl text-navy">
            PN Construction chrome OK — sections come next
          </h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
