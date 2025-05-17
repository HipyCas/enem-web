export const PATRONS: Record<string, Patron[]> = {
  platino: [
    {
      name: "Casio",
      logo: "/2025/img/patrons/platino/24_CASIO_blue_RGB.png",
      website: "https://www.casio.com/es/",
    },
    {
      name: "Instituto Geográfico Nacional (IGN)",
      website: "https://www.ign.es/web/inicio",
      logo: "/2025/img/patrons/platino/Doc digitales MTMT IGN-CNIG color 3n.png",
    },
    {
      name: "OGA Data Driven Solutions",
      website: "https://www.oga.ai/",
      logo: "/2025/img/patrons/platino/OGA Logo horiz.png",
    },
  ],
  oro: [
    {
      name: "Instituto Nacional de Estadística (INE)",
      website: "https://ine.es",
      logo: "/2025/img/patrons/oro/logo INE.jpg",
    },
    {
      name: "Navantia",
      website: "https://www.navantia.es/es/",
      logo: {
        light: "/2025/img/patrons/oro/Navantia vertical color positivo (1).jpg",
        dark: "/2025/img/patrons/oro/Navantia vertical blanco PNG.png"
      },
    },
  ],
  plata: [
    {
      name: "Instituto de Ingeniería del Conocimiento (IIC)",
      website: "https://www.iic.uam.es/",
      logo: {
        light: "/2025/img/patrons/plata/Logo IIC_positivo.png",
        dark: "/2025/img/patrons/plata/Logo-IIC_negativo.png",
      },
    },
    {
      name: "Seidor",
      website: "https://www.seidor.com/es-es",
      logo: "/2025/img/patrons/plata/seidor.png",
    },
  ],
  bronce: [
    {
      name: "Management Solutions",
      website: "https://www.managementsolutions.com",
      logo: {
        light: "/2025/img/patrons/bronce/Management Solutions 16.9.png",
        dark: "/2025/img/patrons/bronce/Management Solutions 16.9 oscuro.png",
      },
    },
    {
      name: "Afi Global Education",
      website: "https://www.afiglobaleducation.com/",
      logo: "/2025/img/patrons/bronce/Logo_Afi_Escuela_30_72ppp.png",
    },
    {
      name: "GMV",
      website: "https://www.gmv.com/es-es",
      logo: "/2025/img/patrons/bronce/logo GMV.png.png",
    },
    {
      name: "Jane Street",
      website: "https://www.janestreet.com/",
      logo: "/2025/img/patrons/bronce/logo_horizontal_black_registered.png",
    },
    {
      name: "Bluetab",
      website: "https://bluetab.net/es/",
      logo: "/2025/img/patrons/bronce/Bluetab.svg",
    },
  ],
  colaboradores: [
    // {
    //   name: "Delegación de Estudiantes de la Facultad de Ciencias Económicas y Empresariales (UGR)",
    //   website: "https://fccee.ugr.es/estudiantes/delegacion",
    //   logo: "/2025/img/patrons/colaboradores/deccee.webp",
    // },
  ],
};

export async function GET() {
  return new Response(JSON.stringify(PATRONS));
}

export interface Patron {
  name: string;
  website: string;
  logo:
    | string
    | {
        light: string;
        dark: string;
      };
}
