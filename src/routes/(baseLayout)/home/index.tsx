import Carousel, { CarouselItem } from "~/components/Carousel";

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    title: "ยินดีต้อนรับสู่ Stranger's Book",
    description: "สำนักพิมพ์หนังสือคุณภาพ",
    background: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
  },
  {
    id: 2,
    title: "หนังสือหลากหลายประเภท",
    description: "ค้นหาหนังสือที่คุณชื่นชอบ",
    background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
  },
  {
    id: 3,
    title: "สำนักพิมพ์ Stranger's Book",
    description: "เรื่องราวที่รอให้คุณค้นพบ",
    background: "linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)",
  },
];

export default function Home() {
  return (
    <div class="w-full">
      <Carousel items={carouselItems} autoPlay={true} interval={5000} />
    </div>
  );
}