import { useState, useEffect } from "react";

import { useMarriageDetails } from "@/app/contexts/marriage";

import { textCookie } from "@/app/fonts/cookie";
import { ExtractLocaleHoursMinutes } from "../utils/date";

interface Countdown {
  hari: number;
  jam: number;
  menit: number;
  detik: number;
}

export default function Event() {
  const { guest, event, bride, groom } = useMarriageDetails();

  let resepsi = event.resepsi.find(x => x.session == guest.session);

  if (!resepsi) {
    resepsi = event.resepsi[0];
  }

  const akadStartDate = new Date(event.akad.startDate);
  const akadEndDate = new Date(event.akad.endDate);
  const resepsiStartDate = new Date(resepsi.startDate);
  const resepsiEndDate = new Date(resepsi.endDate);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function calculateTimeLeft(): Countdown {
    const difference = akadStartDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return { 
        hari: 0, 
        jam: 0, 
        menit: 0,
        detik: 0 
      }
    }

    return {
      hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
      jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
      menit: Math.floor((difference / (1000 * 60)) % 60),
      detik: Math.floor((difference / 1000) % 60),
    }
  }

  function saveToCalendar() {
    const formatDate = (date: Date) => date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const details = {
      action: "TEMPLATE",
      text: `Resepsi Pernikahan ${groom.nickname} & ${bride.nickname}`,
      dates: `${formatDate(resepsiStartDate)}/${formatDate(resepsiEndDate)}`,
      details: `
        Resepsi Pernikahan ${groom.nickname} & ${bride.nickname}
        Waktu: ${ExtractLocaleHoursMinutes(resepsiStartDate)} - ${ExtractLocaleHoursMinutes(resepsiEndDate)} (Sesi ${resepsi?.session})
        Lokasi: ${event.location.name}
      `,
      location: event.location.mapsAddress,
    };

    const url = new URL("https://www.google.com/calendar/render");
    Object.entries(details).forEach(([key, value]) => url.searchParams.append(key, value));

    window.open(url.toString(), "_blank");

  }


  return (
    <div id="event" className="flex flex-col items-center bg-white text-gray-800 min-h-screen pb-24">
      <div className="text-center px-4">
        <h2 className={`text-6xl font-semibold ${textCookie.className} mb-4`}>Detail Acara</h2>
        <div className="mt-8 flex flex-col sm:flex-row w-full justify-center items-stretch sm:space-x-4 px-4 text-black">
          <div className="w-full md:w-1/2 sm:w-full bg-gray-50 p-6 rounded-lg shadow mb-4 sm:mb-0">
            <h3 className="text-2xl font-semibold mb-2">Akad</h3>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
            <p className="mb-2"><i className="fa-regular fa-calendar"></i> {event.akad.mainDate}</p>
            <p><i className="fa-regular fa-clock"></i> {ExtractLocaleHoursMinutes(akadStartDate)} - {ExtractLocaleHoursMinutes(akadEndDate)}</p>
          </div>
          <div className="w-full md:w-1/2 sm:w-full bg-gray-50 p-6 rounded-lg shadow mb-4 sm:mb-0">
            <h3 className="text-2xl font-semibold mb-2">Resepsi</h3>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
            <p className="mb-2"><i className="fa-regular fa-calendar"></i> {resepsi.mainDate}</p>
            <p className="mb-2"><i className="fa-regular fa-clock"></i> {ExtractLocaleHoursMinutes(resepsiStartDate)} - {ExtractLocaleHoursMinutes(resepsiEndDate)}</p>
            <p><i className="fa-solid fa-business-time"></i> Sesi {resepsi.session}</p>
          </div>
        </div>
        {/* <div className="pt-4">
          <i>*Acara akan diselenggarakan dengan tamu pria dan wanita yang dipisah (Walimatul Infishal)</i>
        </div> */}
        <div className="mt-12">
          <p className="text-xl font-semibold"><i className="fa-solid fa-location-dot"></i> {event.location.name}</p>
          <div className="relative overflow-hidden pb-[75%] mt-4 rounded-xl">
            <iframe className="absolute top-0 left-0 w-full h-full" src={event.location.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        <div className="mt-24">
          <h3 className={`text-3xl font-semibold mb-4`}>Hitung Mundur</h3>
          <div className="mt-8 flex flex-row w-full justify-center items-stretch space-x-4 px-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="flex flex-col items-center">
                <div className="text-xl sm:text-4xl font-semibold bg-gray-50 px-6 py-4 rounded-lg shadow">
                  {value.toString().padStart(2, "0")}
                </div>
                <div className="text-sm font-medium mt-2 uppercase">{unit}</div>
              </div>
            ))}
          </div>
          <button 
            type="submit" 
            className="mt-12 bg-white hover:bg-gray-100 text-[#698fc8] border border-[#698fc8] font-bold text-lg px-6 py-3 rounded-xl shadow-lg transition" 
            onClick={saveToCalendar}
          >
            Simpan Tanggal
          </button>
        </div>
      </div>
      
    </div>
  )
}
