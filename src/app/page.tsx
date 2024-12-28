"use client";

import { useEffect, useState } from "react";

import { MarriageProvider } from "@/app/contexts/marriage";

import { supabase } from "@/app/utils/supabaseClient";

import Cover from "@/app/components/cover";
import Ayah from "@/app/components/ayah";
import Couple from "@/app/components/couple";
import Event from "@/app/components/event";
import RSVP from "@/app/components/rsvp";
import Closing from "@/app/components/closing";
import WidgetMusic from "@/app/components/widget/music";

const marriageDetails = {
  groom: {
    name: "Muhammad Abdurrohman Al Fatih",
    nickname: "Fatih",
    order: "Pertama",
    father: "Bapak Amin Syafi'i",
    mother: "Ibu Ida Ristianti",
  },
  bride: {
    name: "Fathiyyah Nurul Islami",
    nickname: "Fathiyyah",
    order: "Pertama",
    father: "Bapak Muhammad Arief Santoso",
    mother: "Ibu Ely Suryani",
  },
  event: {
    mainDate: "Sabtu, 23 Februari 2025",
    akad: {
      date: "Sabtu, 23 Februari 2025",
      time: "07:00 - 09:00",
    },
    resepsi: {
      date: "Sabtu, 23 Februari 2025",
      time: "09:00 - 15:00",
    },
    location: {
      name: "Masjid Jami Al-Muhajirin, Bekasi",
      maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.476306587357!2d107.0078312!3d-6.200721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698bfd667e32b7%3A0x345ea61e5269ba4c!2sMasjid%20Jami%20Al-Muhajirin!5e0!3m2!1sen!2sid!4v1734969343441!5m2!1sen!2sid"
    }
  },
}

interface GuestData {
  slug: string;
  name: string;
}

export default function Home() {
  const [guest, setGuest] = useState<GuestData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<number>(0);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const guestSlug = queryParams.get("to") || "";

    if (guestSlug) {
      const fetchGuest = async () => {
        const { data, error } = await supabase
          .from("guests")
          .select("slug, name")
          .eq("slug", guestSlug)
          .single();

        if (error) {
          setError("Undangan bermasalah atau tidak ditemukan");
          setGuest(null);
        } else {
          setGuest(data);
          setError(null);
        }
      };

      fetchGuest();
    } else {
      setError("Undangan tidak valid");
    }
  }, []);

  useEffect(() => {
    if (open > 0) {
      const elem = document.getElementById("ayah");
    
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [open]);


  if (error) {
    return <div>{error}</div>;
  }

  if (!guest) {
    return <div>Loading invitation...</div>;
  }

  return (
    <MarriageProvider value={{
      ...marriageDetails,
      guest: {
        slug: guest.slug,
        name: guest.name,
      }
    }}>
      <Cover openHandler={() => setOpen(open + 1)}/>
      {open > 0 && (
        <>
          <Ayah/>
          <Couple/>
          <Event/>
          <RSVP/>
          <Closing/>
          <WidgetMusic/>
        </>
      )}
    </MarriageProvider>
  );
}
