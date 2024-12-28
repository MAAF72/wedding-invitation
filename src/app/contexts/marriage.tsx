import { createContext, ReactNode, useContext } from "react";

export interface MarriageDetails {
  groom: {
    name: string;
    nickname: string;
    order: string;
    father: string;
    mother: string;
  };
  bride: {
    name: string;
    nickname: string;
    order: string;
    father: string;
    mother: string;
  };
  event: {
    mainDate: string;
    akad: {
      date: string;
      time:string;
    },
    resepsi: {
      date:  string;
      time: string;
    },
    location: {
      name: string;
      maps: string;
    }
  };
  guest: {
    slug: string;
    name: string;
  };
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