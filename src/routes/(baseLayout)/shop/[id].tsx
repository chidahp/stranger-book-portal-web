import { useParams, A } from "@solidjs/router";
import { createSignal, Show, For } from "solid-js";
import { Star, Check, ChevronRight, User, Tag } from "lucide-solid";
import { Book } from "~/components/BookCard";

// Mock data - ในอนาคตจะดึงจาก API
const mockBooks: Book[] = [
  {
    id: 1,
    title: "เป็ด ความตาย และดอกทิวลิป Duck, Death and the Tulip (NEW EDITION)",
    author: "วัชรวิชญ์ (แปล)",
    coverImage: "https://www.strangersbook.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%94-%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%95%E0%B8%B2%E0%B8%A2-%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B8%97%E0%B8%B4%E0%B8%A7%E0%B8%A5%E0%B8%B4%E0%B8%9B-Duck-Death-and-the-Tulip-600x600.webp",
    price: 299,
    originalPrice: 0,
    description: "ความตายเป็นสิ่งที่คนเราต่างรู้สึกและคิดไปว่า มันช่างอยู่ห่างไกลจากเราเหลือเกิน ทั้งๆที่ในความจริงแล้วมันช่างอยู่ชิดใกล้กับเรา",
    category: "วรรณกรรมแปล",
    rating: 4.5,
  },
  {
    id: 2,
    title: "หนังสือตัวอย่างเล่มที่ 2",
    author: "ผู้เขียนตัวอย่าง",
    coverImage: "https://www.strangersbook.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%94-%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%95%E0%B8%B2%E0%B8%A2-%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B8%97%E0%B8%B4%E0%B8%A7%E0%B8%A5%E0%B8%B4%E0%B8%9B-Duck-Death-and-the-Tulip-600x600.webp",
    price: 350,
    description: "คำอธิบายหนังสือเล่มที่ 2",
    category: "นิยาย",
    rating: 4.8,
  },
  {
    id: 3,
    title: "หนังสือตัวอย่างเล่มที่ 3",
    author: "ผู้เขียนตัวอย่าง",
    coverImage: "https://www.strangersbook.com/wp-content/uploads/2024/10/%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%94-%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%95%E0%B8%B2%E0%B8%A2-%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B8%97%E0%B8%B4%E0%B8%A7%E0%B8%A5%E0%B8%B4%E0%B8%9B-Duck-Death-and-the-Tulip-600x600.webp",
    price: 450,
    originalPrice: 550,
    description: "คำอธิบายหนังสือเล่มที่ 3",
    category: "สารคดี",
    rating: 4.2,
  },
];

export default function ShopDetail() {
  const params = useParams<{ id: string }>();
  const [quantity, setQuantity] = createSignal(1);

  // Find book by ID
  const book = () => mockBooks.find(b => b.id === Number(params.id)) || mockBooks[0];
  const currentBook = book();

  const formatPrice = (price?: number) => {
    if (!price) return null;
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleOrder = () => {
    console.log("Order:", currentBook.id, quantity());
  };

  const discountPercentage = () => {
    if (currentBook.originalPrice && currentBook.price) {
      return Math.round(((currentBook.originalPrice - currentBook.price) / currentBook.originalPrice) * 100);
    }
    return 0;
  };

  return (
    <div class="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-4">
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <A href="/home" class="hover:text-gray-900 transition-colors">
              หน้าแรก
            </A>
            <ChevronRight class="w-4 h-4" />
            <A href="/home" class="hover:text-gray-900 transition-colors">
              หนังสือ
            </A>
            <ChevronRight class="w-4 h-4" />
            <span class="text-gray-900 font-medium">{currentBook.category || "สินค้า"}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8 lg:py-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20">
          {/* Left: Book Cover */}
          <div class="flex justify-center lg:justify-start">
            <div class="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
              <div class="relative aspect-[2/3] bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200">
                <Show
                  when={currentBook.coverImage}
                  fallback={
                    <div class="w-full h-full flex items-center justify-center bg-gray-100">
                      <span class="text-gray-400">ไม่มีรูปภาพ</span>
                    </div>
                  }
                >
                  <img
                    src={currentBook.coverImage}
                    alt={currentBook.title}
                    class="w-full h-full object-cover"
                  />
                </Show>
                
                {/* Discount Badge */}
                <Show when={currentBook.originalPrice && currentBook.price && currentBook.price < currentBook.originalPrice}>
                  <div class="absolute top-4 right-4">
                    <div class="bg-red-500 text-white px-3 py-1.5 rounded-lg shadow-lg font-bold text-sm">
                      ลด {discountPercentage()}%
                    </div>
                  </div>
                </Show>

                {/* Category Badge */}
                <Show when={currentBook.category}>
                  <div class="absolute top-4 left-4">
                    <div class="bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-lg">
                      <Tag class="w-4 h-4" />
                      {currentBook.category}
                    </div>
                  </div>
                </Show>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div class="space-y-6 lg:max-w-none">
            {/* Title & Author */}
            <div>
              <Show when={currentBook.category}>
                <div class="mb-3">
                  <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    <Tag class="w-3.5 h-3.5" />
                    {currentBook.category}
                  </span>
                </div>
              </Show>
              
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                {currentBook.title}
              </h1>
              
              <div class="flex items-center gap-2 text-gray-600 mb-4">
                <User class="w-5 h-5" />
                <span class="text-lg">{currentBook.author}</span>
              </div>
            </div>

            {/* Price */}
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <div class="flex items-baseline gap-4 mb-2">
                <Show when={currentBook.originalPrice && currentBook.price && currentBook.price < currentBook.originalPrice}>
                  <span class="text-xl text-gray-400 line-through">
                    {formatPrice(currentBook.originalPrice)}
                  </span>
                </Show>
                <span class="text-4xl lg:text-5xl font-bold text-gray-900">
                  {formatPrice(currentBook.price)}
                </span>
              </div>
            </div>

            {/* Order Button */}
            <button
              onClick={handleOrder}
              class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              <span class="text-lg">สั่งซื้อตอนนี้</span>
            </button>

            {/* Description */}
            <div class="bg-white rounded-xl p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">รายละเอียดสินค้า</h3>
              <p class="text-gray-700 leading-relaxed">
                {currentBook.description || "หนังสือเล่มนี้เต็มไปด้วยเรื่องราวที่น่าสนใจและน่าติดตาม"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
