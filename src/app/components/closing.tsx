/* eslint-disable react/no-unescaped-entities */
import { useMarriageDetails } from "@/app/contexts/marriage";

import { textCookie } from "@/app/fonts/cookie";

export default function Closing() {
  const { bride, groom } = useMarriageDetails();

  return (
    <div id="closing" className="flex flex-col items-center justify-between bg-[#698fc8] text-white pb-24">
      <div className="text-center px-4">
        <div className="py-16 text-lg">
          <p className="font-bold">Terima kasih</p>
          <p className="pt-4">Kami yang berbahagia,</p>
          <br/>
          <p className={`${textCookie.className} text-5xl py-8`}>Fatih & Fathiyyah</p>
          <br/>
          <p className="font-bold">Keluarga Mempelai Pria</p>
          <p>{groom.father} dan {groom.mother}</p>
          <br/>
          <p className="font-bold">Keluarga Mempelai Wanita</p>
          <p>{bride.father} dan {bride.mother}</p>
        </div>

        <i className="fa-solid fa-circle-dot mx-1"></i>

        <div className={`${textCookie.className} text-center py-12`}>
          <p className="text-2xl bg-clip-text pt-2">Wassalamu'alaikum Wa Rahmatullahi Wa Barakatuh</p>
          <br/>
          <span className="text-4xl bg-clip-text pt-12">اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ</span>
        </div>

        <hr/>

        <div className="pt-12">
          <small>Build with<i className="fa-solid fa-heart mx-1"></i><a href="https://www.instagram.com/altair.go/">Fatih</a></small>
        </div>
      </div>
    </div>
  )
}
