import { createContext, ReactNode, useContext } from "react";

export interface MarriageDetails {
  groom: {
    name: string;
    nickname: string;
    telegramMentionID: string;
    instagramUsername: string;
    order: string;
    father: string;
    mother: string;
  };
  bride: {
    name: string;
    nickname: string;
    telegramMentionID: string;
    instagramUsername: string;
    order: string;
    father: string;
    mother: string;
  };
  event: {
    mainDate: string;
    formatDate: string;
    akad: {
      mainDate: string;
      formatDate: string;
      startDate: string;
      endDate: string;
    },
    resepsi: {
      session: string;
      mainDate:  string;
      formatDate: string;
      startDate: string;
      endDate: string;
    }[],
    location: {
      name: string;
      mapsAddress: string;
      mapsEmbed: string;
    }
  };
  guest: {
    unique_code: string;
    name: string;
    session: string;
  };
  loveStory: {
    title: string;
    formatDate: string;
    description: string;
  }[];
}

export const MarriageContext = createContext<MarriageDetails | undefined>(undefined);

type MarriageProviderProps = {
  children?: ReactNode
  value?: MarriageDetails
}

export const MarriageProvider = (props: MarriageProviderProps) => {
  return (
    <MarriageContext.Provider value={props.value}>
      { props.children }
    </MarriageContext.Provider>
  )
}

export const useMarriageDetails = () => {
  const context = useContext(MarriageContext);
  if (!context) {
    throw new Error(
      "useMarriageDetails must be used within a MarriageProvider"
    );
  }

  return context;
};