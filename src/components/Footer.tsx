import {
  FaFacebook,
  FaTiktok
} from 'react-icons/fa'

export default function Footer() {

  return (

    <footer
      className="
      bg-[#002E50]
      text-white
      mt-20
      "
    >

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
          md:grid-cols-3
          gap-8
          "
        >

          <div>

            <h2
              className="
              text-2xl
              font-bold
              mb-3
              "
            >
              Importadora Lider
            </h2>

            <p>
              Productos importados
              al mejor precio.
            </p>

          </div>

          <div>

            <h3
              className="
              font-bold
              mb-3
              "
            >
              Contacto
            </h3>

            <p>
              Teléfono:
              70000000
            </p>

            <p>
              Cochabamba - Bolivia
            </p>

          </div>

          <div>

            <h3
              className="
              font-bold
              mb-3
              "
            >
              Redes Sociales
            </h3>

            <div
              className="
              flex
              gap-5
              text-3xl
              "
            >

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="
                hover:text-[#F28A2E]
                transition
                "
              >
                <FaFacebook />
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="
                hover:text-[#F28A2E]
                transition
                "
              >
                <FaTiktok />
              </a>

            </div>

          </div>

        </div>

        <div
          className="
          border-t
          border-gray-600
          mt-8
          pt-4
          text-center
          text-sm
          "
        >

          © 2026 LlajtaSoft.
          Todos los derechos reservados.

        </div>

      </div>

    </footer>

  )

}