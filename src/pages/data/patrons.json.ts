export const PATRONS: Record<string, Patron[]> = {
  platino: [
    {
      name: "Casio",
      logo: "/2025/img/patrons/platino/24_CASIO_blue_RGB.png",
      website: "https://www.casio.com/es/",
    },
    {
      name: "Instituto Geográfico Nacional",
      website: "https://www.ign.es/web/inicio",
      logo: "/2025/img/patrons/platino/Doc digitales MTMT IGN-CNIG color 3n.png",
    },
  ],
  oro: [
    {
      name: "Instituto Nacional de Estadística",
      website: "https://ine.es",
      logo: "/2025/img/patrons/oro/logo INE.jpg",
    },
  ],
  plata: [
    {
      name: "Instituto de Ingeniería del Conocimiento",
      website: "https://www.iic.uam.es/",
      logo: {
        light: "/2025/img/patrons/plata/Logo IIC_positivo.png",
        dark: "/2025/img/patrons/plata/Logo-IIC_negativo.png",
      },
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
  ],
  colaboradores: [],
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
