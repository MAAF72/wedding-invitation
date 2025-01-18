import { useMarriageDetails } from "@/app/contexts/marriage";

import { textCookie } from "@/app/fonts/cookie";
import Image from "next/image";

interface CoverProps {
  openHandler: () => void
}

export default function Cover(props: CoverProps) {
  const { groom, bride, event, guest } = useMarriageDetails();

  return (
    <div id="cover" className="flex flex-col items-center justify-between bg-[#698fc8] text-white h-screen pb-36 sm:pb-24 px-12">
      <span className="block sm:hidden">Extra Small (xs)</span>
      <span className="hidden sm:block md:hidden">Small (sm)</span>
      <span className="hidden md:block lg:hidden">Medium (md)</span>
      <span className="hidden lg:block xl:hidden">Large (lg)</span>
      <span className="hidden xl:block">Extra Large (xl)</span>

      {/* Top-Left Ornament */}
      <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 p-4">
        <Image
          src="/assets/images/ornament.png"
          alt="Top Left Ornament"
          width={192}
          height={192}
          style={{
            transform: "rotate(0deg)",
            filter: "invert(100%) brightness(100%)",
          }}
        />
      </div>

      {/* Top-Right Ornament */}
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 p-4">
        <Image
          src="/assets/images/ornament.png"
          alt="Top Right Ornament"
          width={192}
          height={192}
          style={{
            transform: "scaleX(-1)",
            filter: "invert(100%) brightness(100%)",
          }}
        />
      </div>

      {/* Bottom-Left Ornament */}
      <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 p-6">
        <Image
          src="/assets/images/ornament.png"
          alt="Bottom Left Ornament"
          width={192}
          height={192}
          style={{
            transform: "scaleY(-1)",
            filter: "invert(100%) brightness(100%)",
          }}
        />
      </div>

      {/* Bottom-Right Ornament */}
      <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 p-6">
        <Image
          src="/assets/images/ornament.png"
          alt="Bottom Right Ornament"
          width={192}
          height={192}
          style={{
            transform: "scaleX(-1) scaleY(-1)",
            filter: "invert(100%) brightness(100%)",
          }}
        />
      </div>

      <div className="flex flex-col items-center justify-center flex-grow pt-8 pb-4 text-center">
        <p className="text-lg md:text-xl font-semibold mb-8">Pernikahan</p>
        <p className={`text-7xl md:text-8xl ${textCookie.className}`}>{groom.nickname}</p>
        <p className={`text-5xl md:text-6xl py-2 ${textCookie.className}`}>&</p>
        <p className={`text-7xl md:text-8xl ${textCookie.className}`}>{bride.nickname}</p>
        <p className="text-xl md:text-2xl font-light pt-12">{event.mainDate}</p>
        <p className="text-lg md:text-xl pt-14">Kepada:</p>
        <p className="text-xl md:text-2xl pt-2">{guest.name}</p>

        <div className="mt-8 w-16 h-1 bg-white rounded-lg"></div>
      </div>

      <div className="text-center">
        <button onClick={props.openHandler} id="open-invitation" className="bg-white hover:bg-gray-100 text-[#698fc8] font-bold py-2 px-6 rounded-lg shadow-lg transition">
          Buka Undangan
        </button>
      </div>
    </div>
  )
}
