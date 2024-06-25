import { useState, useEffect} from "react";

export default function LoginCarousel({ slides ,
   autoSlide = false,
  autoSlideInterval = 5000})
   {
    const [curr, setCurr] = useState(0)

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

  useEffect(() => {
    if (!autoSlide) return
    const slideInterval = setInterval(next, autoSlideInterval)
    return () => clearInterval(slideInterval)
  },[])

  return (
    <div className="overflow-hidden relative bg-black  ">
      <div
        className={`flex transition ease-out duration-40  h-screen`}
        style={{
          transform: `translateX(-${curr * 100}%)`,
        }}
      >
        {slides.map((s) => {
          return <img src={s} className={"object-cover opacity-50"} />;
        })}
      </div>

      <div className="absolute top-3/4 py-4 w-2/4 h-28 left-1/4">
    <p class="text-black font-inter text-2xl font-medium">
        Hire your favourite influencers from trending social media platforms easily with
        <span class="text-blue-600 font-inter font-semibold"> keek.</span>
    </p>
</div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {slides.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurr(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-2 h-2 cursor-pointer  ${
                i == curr ? "bg-white w-4 h-2 " : "bg-gray-500"
              }`}
            >

            </div>
          );
        })}
      </div>
    </div>
  );
}