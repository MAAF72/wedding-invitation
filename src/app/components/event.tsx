import { useMarriageDetails } from "@/app/contexts/marriage";

import { textCookie } from "@/app/fonts/cookie";

export default function Event() {
  const { event } = useMarriageDetails();

  return (
    <div id="event" className="flex flex-col items-center bg-white text-gray-800 pt-8 min-h-screen">
      <div className="text-center px-4">
        <h2 className={`text-6xl font-semibold ${textCookie.className} mb-4`}>Detail Acara</h2>
        <div className="mt-8 flex flex-col sm:flex-row w-full justify-center md:space-x-4 text-black">
          <div className="flex-none w-full md:w-1/2 sm:w-full bg-gray-50 p-6 rounded-lg shadow mb-4 sm:mb-0">
            <h3 className="text-2xl font-semibold mb-2">Akad</h3>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
            <p className="mb-2"><i className="fa-regular fa-calendar"></i> {event.akad.date}</p>
            <p><i className="fa-regular fa-clock"></i> {event.akad.time}</p>
          </div>
          <div className="flex-none w-full md:w-1/2 sm:w-full bg-gray-50 p-6 rounded-lg shadow mb-4 sm:mb-0">
            <h3 className="text-2xl font-semibold mb-2">Resepsi</h3>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
            <p className="mb-2"><i className="fa-regular fa-calendar"></i> {event.resepsi.date}</p>
            <p><i className="fa-regular fa-clock"></i> {event.resepsi.time}</p>
          </div>
        </div>
        {/* <div className="pt-4">
          <i>*Acara akan diselenggarakan dengan tamu pria dan wanita yang dipisah (Walimatul Infishal)</i>
        </div> */}
        <div className="mt-12">
          <p className="text-xl font-semibold"><i className="fa-solid fa-location-dot"></i> {event.location.name}</p>
          <div className="relative overflow-hidden pb-[75%] mt-4 rounded-xl">
            <iframe className="absolute top-0 left-0 w-full h-full" src={event.location.maps} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
