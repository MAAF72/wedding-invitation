import Image from "next/image";

interface DividerProps {
  rotate?: boolean;
}

export default function Divider(props: DividerProps) {
  return (
    <div className={`relative w-screen lg:h-[90px] h-[60px] overflow-hidden ${props.rotate ? "transition-all transform rotate-180" : "mt-8" }`}>
      <Image 
        fill={true} 
        priority={true} 
        src="/assets/images/mask.png" 
        alt="Divider" 
      />
    </div>
  )
}
