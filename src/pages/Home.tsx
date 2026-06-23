import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

export default function Home() {

  return (
    <>
      <Navbar />

      <Hero />
      <section
        className="
        max-w-7xl
        mx-auto
        py-16
        px-6
        "
        >

        <div
        className="
        grid
        md:grid-cols-3
        gap-8
        "
        >

        <div
        className="
        bg-white
        p-6
        rounded-xl
        shadow
        "
        >
        🚚

        <h3 className="font-bold text-xl mt-3">
        Entrega rápida
        </h3>

        <p>
        Productos disponibles
        para entrega inmediata.
        </p>

        </div>

        <div
        className="
        bg-white
        p-6
        rounded-xl
        shadow
        "
        >
        💰

        <h3 className="font-bold text-xl mt-3">
        Mejores precios
        </h3>

        <p>
        Importación directa.
        </p>

        </div>

        <div
        className="
        bg-white
        p-6
        rounded-xl
        shadow
        "
        >
        ⭐

        <h3 className="font-bold text-xl mt-3">
        Calidad garantizada
        </h3>

        <p>
        Productos seleccionados.
        </p>

        </div>

        </div>

        </section>

      <Footer />
    </>
  )

}