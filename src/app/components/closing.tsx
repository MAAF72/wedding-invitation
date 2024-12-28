/* eslint-disable react/no-unescaped-entities */
import { useMarriageDetails } from "@/app/contexts/marriage";

import { textCookie } from "@/app/fonts/cookie";

import Divider from "@/app/components/divider";

export default function Closing() {
  const { guest } = useMarriageDetails();

  return (
    <div id="closing" className="flex flex-col items-center bg-blue-500 text-white">
      <Divider rotate={true}/>
      <div className="text-center px-4">
        <div className="pt-16 py-12">
          <p>Terima kasih atas perhatian dan doa restu <span className="font-semibold">{guest.name}</span>, yang menjadi kebahagiaan serta kehormatan besar bagi kami</p>
        </div>

        <div className={`${textCookie.className} text-center`}>
          <p className="text-2xl bg-clip-text pt-2">Wassalamu'alaikum Wa Rahmatullahi Wa Barakatuh</p>
          <br/>
          <span className="text-4xl bg-clip-text pt-12">اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ</span>
        </div>
      </div>
      
      <hr className="pb-12"/>

      <div className="pt-4 pb-12">
        <small>Build with<i className="fa-solid fa-heart mx-1"></i>Fatih</small>
      </div>
    </div>
  )
}
