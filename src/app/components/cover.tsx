import { useMarriageDetails } from "@/app/contexts/marriage";

import { textCookie } from "@/app/fonts/cookie";

interface CoverProps {
  openHandler: () => void
}

export default function Cover(props: CoverProps) {
  const { groom, bride, event, guest } = useMarriageDetails();
  
  return (
    <div id="cover" className="flex flex-col items-center justify-between bg-blue-500 text-white min-h-screen">
      {/* <div className="absolute top-0 left-0 w-full flex justify-center">
        <img src="./assets/images/ornament-top.png" alt="Ornament" className="w-32 opacity-80">
      </div> */}

      <div className="flex flex-col items-center justify-center flex-grow pt-8">
        <p className="text-xl font-semibold mb-8">Pernikahan</p>
        <p className={`text-8xl ${textCookie.className}`}>{groom.nickname}</p>
        <p className={`text-6xl py-2 ${textCookie.className}`}>&</p>
        <p className={`text-8xl ${textCookie.className}`}>{bride.nickname}</p>
        <p className="text-2xl font-light pt-20">{event.mainDate}</p>
        <p className="text-xl pt-24">Kepada:</p>
        <p className="text-2xl pt-2">{guest.name}</p>
        
        <div className="mt-8 w-16 h-1 bg-white rounded-lg"></div>
      </div>
      
      <div className="mb-28 text-center">
        <button onClick={props.openHandler} id="open-invitation" className="bg-white hover:bg-gray-100 text-blue-500 font-bold py-2 px-6 rounded-lg shadow-lg transition">
          Buka Undangan
        </button>
      </div>

      {/* <div className="absolute bottom-0 left-0 w-full flex justify-center">
          <img src="./assets/images/ornament-bottom.png" alt="Ornament" className="w-32 opacity-80">
      </div> */}
    </div>
  )
}
