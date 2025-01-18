"use client";

import { useEffect, useState } from "react";

import { MarriageProvider } from "@/app/contexts/marriage";

import Cover from "@/app/components/cover";
import Ayah from "@/app/components/ayah";
import Couple from "@/app/components/couple";
import Event from "@/app/components/event";
import RSVP from "@/app/components/rsvp";
import Closing from "@/app/components/closing";
import WidgetMusic from "@/app/components/widget/music";

import { marriageDetails } from "@/app/data";

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
        const response = await fetch(`/api/guest?slug=${guestSlug}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (response.status == 200) {
          const resJson = await response.json();

          setGuest(resJson);
          setError(null);

          return
        } 

        if (response.status == 404) {
          setError("Undangan tidak ditemukan");
          setGuest(null);

          return
        }

        setError("Undangan bermasalah");
        setGuest(null);
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
