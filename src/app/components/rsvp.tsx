import { useState } from "react";

import { useMarriageDetails } from "@/app/contexts/marriage";

import { textCookie } from "@/app/fonts/cookie";

import Divider from "@/app/components/divider";

export default function RSVP() {
  const { guest } = useMarriageDetails();

  const [attendance, setAttendance] = useState(true); // True for "Hadir", False for "Tidak Hadir"
  const [message, setMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionStatus("loading");

    try {
      // Replace this with your actual submission logic (e.g., Supabase, API call)
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guest: guest.slug,
          is_will_attend: attendance,
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit RSVP.");
      }

      setSubmissionStatus("success");
    } catch (error) {
      console.error(error);
      setSubmissionStatus("error");
    }
  };

  return (
    <div id="rsvp" className="flex flex-col items-center bg-white text-gray-800">
      <Divider rotate={true}/>
      <div className="text-center px-4">
        <h2 className={`text-6xl font-semibold ${textCookie.className} mb-4`}>Kehadiran</h2>
        <p className="text-lg pb-2">Merupakan suatu kehormatan dan kebahagian bagi kami, apabila <span className="font-semibold">{guest.name}</span> berkenan hadir untuk memberikan doa restu kepada kami</p>
        <p className="text-lg">Mohon konfirmasi kehadiran, terima kasih!</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center bg-white">
            <label className="relative w-60 h-16 bg-gray-200 rounded-full cursor-pointer flex items-center select-none group">
              <input 
                name="rsvp-check" 
                className="peer/rsvp hidden" 
                type="checkbox" 
                value="true" 
                checked={attendance} 
                onChange={() => setAttendance((prev) => !prev)} 
              />

              <div className="w-1/2 h-full bg-red-500 rounded-full transition-all shadow-md absolute left-1/2 peer-checked/rsvp:left-0 peer-checked/rsvp:bg-blue-500 group-hover:shadow-xl"></div>

              <span className="relative w-1/2 h-full flex items-center justify-center font-bold text-black peer-checked/rsvp:text-white transition duration-300">Hadir</span>
              <span className="relative w-1/2 h-full flex items-center justify-center font-bold text-white peer-checked/rsvp:text-black transition duration-300">Tidak Hadir</span>
            </label>
          </div>
          
          <textarea 
            name="rsvp-message" 
            placeholder="Pesan" 
            className="w-full p-3 border rounded-lg shadow transition"
            rows={2}
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
          />
          
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition" 
            disabled={submissionStatus === "loading"}
          >
            {submissionStatus === "loading" ? "Mengirim..." : "Konfirmasi"}
          </button>

          {submissionStatus === "success" && <p className="text-green-500 mt-4">RSVP berhasil dikirim!</p>}
          {submissionStatus === "error" && <p className="text-red-500 mt-4">Terjadi kesalahan. Silakan coba lagi.</p>}

        </form>
      </div>
      <Divider/>
    </div>
  )
}
