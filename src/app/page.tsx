import Image from "next/image";

/* const playlist = [
  {
    id: 1,
    title: "디자이너가 되는 가장 빠른 길 1강",
    media_content_key: "GBTVHoCE",
  },
  {
    id: 2,
    title: "디자이너가 되는 가장 빠른 길 2강",
    media_content_key: "NBj8HoCH",
  },
  {
    id: 3,
    title: "디자이너가 되는 가장 빠른 길 3강",
    media_content_key: "7d1SHoHN",
  },
]; */

export default async function Home({searchParams} : any) {
  const { key } = await searchParams;
  const res = await fetch(`${process.env.BASE_URL_DEV}/api/jwt?media_content_key=${key ? key : "GBTVHoCE"}`, {
    method: "GET"
  }).then(res => res.json());

  return (
    <div>
      <div><a href="?key=GBTVHoCE">디자이너가 되는 가장 빠른 길 1강</a></div>
      <div><a href="?key=NBj8HoCH">디자이너가 되는 가장 빠른 길 2강</a></div>
      <div><a href="?key=7d1SHoHN">디자이너가 되는 가장 빠른 길 3강</a></div>
      <iframe width="840" height="472" src={res.url} frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>
    </div>
  );
}
