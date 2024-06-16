import { currentDate, season2LaunchDate } from "@/lib/helpers";

const AirdropLive = () => {
  return (
    <div className="flex items-center gap-2 border-[1px] border-primary rounded-full px-4 py-2.5 xl:px-3.5 xl:py-2 md:px-2 md:py-1.5">
      <span className="relative flex h-3.5 w-3.5 xl:h-3 xl:w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-br from-green-200 to-green-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 xl:h-3 xl:w-3 bg-gradient-to-br from-green-200 to-green-500"></span>
      </span>
      <p className="leading-none xl:text-xs text-primary font-bold text-nowrap">
        {currentDate >= season2LaunchDate ? 'Season 2 is live!' : 'Airdrop Live'}
      </p>
    </div>
  )
}

export default AirdropLive;
