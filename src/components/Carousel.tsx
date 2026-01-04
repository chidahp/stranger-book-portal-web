import { createSignal, onCleanup, onMount, Show, For } from "solid-js";
import { ChevronLeft, ChevronRight } from "lucide-solid";

export interface CarouselItem {
  id: number;
  image?: string;
  title?: string;
  description?: string;
  background?: string; // CSS background value (e.g., "linear-gradient(...)", "#000000", "url(...)")
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
}

export default function Carousel(props: CarouselProps) {
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [isAutoPlaying, setIsAutoPlaying] = createSignal(props.autoPlay ?? true);
  let intervalId: ReturnType<typeof setInterval> | undefined;

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % props.items.length);
    resetAutoPlay();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + props.items.length) % props.items.length);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    if (isAutoPlaying()) {
      startAutoPlay();
    }
  };

  const startAutoPlay = () => {
    if (props.autoPlay && props.items.length > 1) {
      intervalId = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % props.items.length);
      }, props.interval ?? 5000);
    }
  };

  const pauseAutoPlay = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = undefined;
    }
  };

  onMount(() => {
    if (isAutoPlaying()) {
      startAutoPlay();
    }
  });

  onCleanup(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  return (
    <div 
      class="relative w-full h-[500px] md:h-[600px] overflow-hidden"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={() => isAutoPlaying() && startAutoPlay()}
    >
      {/* Carousel Items */}
      <div 
        class="flex transition-transform duration-500 ease-in-out h-full"
        style={`transform: translateX(-${currentIndex() * 100}%)`}
      >
        <For each={props.items}>
          {(item) => (
            <div class="min-w-full h-full relative">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title || `Slide ${item.id}`}
                  class="w-full h-full object-cover"
                />
              ) : (
                <div 
                  class="w-full h-full flex items-center justify-center"
                  style={item.background ? `background: ${item.background}` : undefined}
                  classList={{
                    "bg-gradient-to-br from-black to-gray-900": !item.background
                  }}
                >
                  <div class="text-center text-white px-6">
                    {item.title && (
                      <h2 class="text-3xl md:text-5xl font-bold mb-4">{item.title}</h2>
                    )}
                    {item.description && (
                      <p class="text-lg md:text-xl text-gray-300">{item.description}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </For>
      </div>

      {/* Navigation Arrows */}
      <Show when={props.items.length > 1}>
        <button
          onClick={prevSlide}
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-yellow-500 p-2 rounded-full transition-all duration-300 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft class="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-yellow-500 p-2 rounded-full transition-all duration-300 z-10"
          aria-label="Next slide"
        >
          <ChevronRight class="w-6 h-6" />
        </button>
      </Show>

      {/* Dots Indicator */}
      <Show when={props.items.length > 1}>
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          <For each={props.items}>
            {(_, index) => (
              <button
                onClick={() => goToSlide(index())}
                class={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex() === index()
                    ? "bg-yellow-500 w-8"
                    : "bg-gray-400 hover:bg-gray-300"
                }`}
                aria-label={`Go to slide ${index() + 1}`}
              />
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}

