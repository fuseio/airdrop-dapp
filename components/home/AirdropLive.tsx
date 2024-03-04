const AirdropLive = () => {
  return (
    <div className="flex items-center gap-2 border-[1px] border-primary rounded-full px-4 py-2.5 md:px-2 md:py-1.5">
      <span className="relative flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-br from-green-200 to-green-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gradient-to-br from-green-200 to-green-500"></span>
      </span>
      <p className="text-lg md:text-[15px] leading-none text-primary font-bold text-nowrap">
        Airdrop Live
      </p>
    </div>
  )
}

export default AirdropLive;
