import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Ubicacion() {

  return (
    <>
      <Navbar />

      <section
        className="
        bg-gradient-to-r
        from-[#002E50]
        to-[#32738C]
        text-white
        py-10
        "
      >

        <div
          className="
          max-w-7xl
          mx-auto
          px-6
          "
        >

          <h1
            className="
            text-4xl
            font-bold
            mb-3
            "
          >
            Nuestra Ubicación
          </h1>

          <p
            className="
            text-lg
            text-white/80
            "
          >
            Encuéntranos fácilmente o contáctanos por WhatsApp.
          </p>

        </div>

      </section>

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-10
        "
      >

        <div
          className="
          grid
          md:grid-cols-2
          gap-8
          "
        >

          <div
            className="
            bg-white
            rounded-2xl
            shadow-lg
            p-6
            "
          >

            <h2
              className="
              text-2xl
              font-bold
              text-[#002E50]
              mb-5
              "
            >
              Información
            </h2>

            <div className="space-y-4">

              <div>
                <p className="font-semibold">
                  📍 Dirección
                </p>

                <p>
                  Urinzaya y Camino al Paso #
                  <br />
                  Cochabamba-Bolivia
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  📞 Teléfono
                </p>

                <p>
                  +591 70000000
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  🕒 Horarios
                </p>

                <p>
                  Lunes a Viernes
                  <br />
                  08:00 - 18:00
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  🚚 Cochabamba
                </p>
              </div>

            </div>

            <a
              href="https://wa.me/59170000000"
              target="_blank"
              rel="noreferrer"
              className="
              inline-block
              mt-6
              bg-[#25D366]
              text-white
              px-6
              py-3
              rounded-xl
              font-bold
              hover:opacity-90
              transition
              "
            >
              Contactar por WhatsApp
            </a>

          </div>

          <div
            className="
            bg-white
            rounded-2xl
            shadow-lg
            p-4
            "
          >

            <iframe
              title="Mapa"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3808.5822968928096!2d-66.26286702483632!3d-17.335691483542647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDIwJzA4LjUiUyA2NsKwMTUnMzcuMSJX!5e0!3m2!1ses!2sbo!4v1782176232985!5m2!1ses!2sbo"
              className="
              w-full
              h-[500px]
              rounded-xl
              border-0
              "
              loading="lazy"
            />

          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}