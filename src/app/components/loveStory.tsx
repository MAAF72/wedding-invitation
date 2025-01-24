import { textCookie } from "@/app/fonts/cookie";

import { useMarriageDetails } from "@/app/contexts/marriage";

export default function LoveStory() {
  const { loveStory } = useMarriageDetails();

  return (
    <div id="love-story" className="flex flex-col flex-grow items-center justify-between bg-white text-gray-800 pb-24">
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        <h2 className={`text-6xl font-semibold ${textCookie.className} mb-4`}>Kisah Mempelai</h2>

        <div className="bg-gray-50 rounded-xl shadow py-12 px-16 text-left">
          <ol className="relative border-s border-gray-200 space-y-12">
            {loveStory.map((story, idx) => {
              const date = new Date(story.formatDate);
              
              return (
                <li key={idx} className="ms-6">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-[#698fc8]">{date.toLocaleString('id-ID', { month: 'long', year: "numeric" })}</time>
                  <h3 className="text-lg font-semibold text-gray-900">{story.title}</h3>
                  <p className="text-base font-normal text-gray-500" dangerouslySetInnerHTML={{__html: story.description}}/>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}
