/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

import { useMarriageDetails } from "@/app/contexts/marriage";

import { textCookie } from "@/app/fonts/cookie";

export default function Couple() {
  const { groom, bride, guest } = useMarriageDetails();

  return (
    <div id="couple" className="flex justify-center bg-white text-gray-800 pt-8 min-h-screen">
      <div className="text-center px-4">
        <div className={`${textCookie.className} text-center`}>
          <span className="text-4xl bg-clip-text mt-2">بِسمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</span>
          <p className="text-2xl bg-clip-text mt-4">Assalamu'alaikum Wa Rahmatullahi Wa Barakatuh</p>
        </div>
        <div className="pt-4 py-12">
          <p>Dengan memohon rahmat & ridho Allah SWT, kami bermaksud mengundang <span className="font-semibold">{guest.name}</span> untuk menghadiri acara pernikahan kami</p>
        </div>

        <hr/>
        
        <h2 className={`text-6xl font-semibold ${textCookie.className} mt-12 mb-4`}>Kedua Mempelai</h2>
        <div className="mt-8 flex flex-col sm:flex-row w-full justify-center items-center md:space-x-4 px-4">
          <div className="flex-none w-full md:w-1/4 sm:w-full bg-gray-200 p-6 rounded-lg shadow mb-4 sm:mb-0 ">
            {/* <div className="relative profile-photo mx-auto mb-8 lg:h-[900px] md:h-[750px] h-[650px]"> */}
            <div className="relative profile-photo mx-auto mb-8 w-1/2">
              <Image 
                height={250} 
                width={100} 
                quality={100} 
                priority={true} 
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto"
                }}
                src="/assets/images/photo_male_blue.png" 
                alt="groom"
              />
            </div>
            <h3 className="text-2xl font-semibold pb-2">{groom.name}</h3>
            <p>Putra {groom.order} dari</p>
            <p>{groom.father} dan {groom.mother}</p>
          </div>
          <div className="flex-none w-full md:w-1/4 sm:w-full bg-gray-200 p-6 rounded-lg shadow mb-4 sm:mb-0">
            {/* <div className="relative profile-photo mx-auto mb-8 lg:h-[900px] md:h-[750px] h-[650px]"> */}
            <div className="relative profile-photo mx-auto mb-8 w-1/2">
            <Image 
                height={250} 
                width={100} 
                quality={100} 
                priority={true} 
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto"
                }}
                src="/assets/images/photo_female_blue.png" 
                alt="bride"
              />
            </div>
            <h3 className="text-2xl font-semibold pb-2">{bride.name}</h3>
            <p>Putri {bride.order} dari</p>
            <p>{bride.father} dan {bride.mother}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
