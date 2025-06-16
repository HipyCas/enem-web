import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { readFileSync } from "fs";
import { join } from "path";
import { map as amap } from "radash";

// import { compile } from "html-to-text";

// const html2Text = compile();
// TODO Maybe it would be good to have it compiled to Mdx and then back to text with this
const html2Text = (s: string) => s;

const md2txt = (md: string) => {
  let s = md
    .replace(/^---[\w\n\s:ó\"\-\.\/úáéí!¡]+---(\n)*/g, "")
    .replace(/\{\/\* .+ \*\/\}/g, "");
  console.info(s);
  s = s.replace(/(\w)\n(\w)/g, "$1$2");
  console.info("2s", s);
  s = s
    .replace(/\n\n/g, "\n")
    .replace(/\*\*([\w\s!¡'aéíóú]+)\*\*/g, "$1")
    .replace(/<i class=".+">([\w\s!¡'aéíóú]+)<\/i>\n/g, "$1")
    .replace(/^\s+/, "");
  return html2Text(s);
};

export const GET: APIRoute = async function (context) {
  const baseURL = `${context.site!.toString().replace(/\/$/, "")}${import.meta.env.BASE_URL}`;

  const news = (await getCollection("blog")).filter((n) => !n.data.draft);

  const items = await amap(news, async (post) => {
    const mdx = readFileSync(
      join(process.cwd(), "src/content/blog", post.id),
      "utf-8",
    );
    const txt = md2txt(mdx);

    return {
      id: post.slug,
      title: post.data.title,
      url: `${baseURL}noticias/${post.slug}`,
      date_published: post.data.publishedDate.toISOString(),
      date_modified: post.data.publishedDate.toISOString(),
      summary: txt.slice(0, Math.min(txt.length, 500)),
      image: encodeURI(
        `${context.site!.toString().replace(/\/$/, "")}${post.data.image}`,
      ),
      tags: post.data.tags,
      // TODO But have to render it yourself content_html: await post.render(),
    };
  });

  return new Response(
    JSON.stringify({
      version: "https://jsonfeed.org/version/1",
      title: "Noticias de XXVI ENEM",
      home_page_url: import.meta.env.BASE_URL,
      feed_url: `${baseURL}feed.json`,
      favicon: `${baseURL}apple-touch-icon.png`,
      language: "es-ES",
      items: items,
    }),
    {
      headers: {
        "Content-Type": "application/feed+json",
      },
    },
  );
};
