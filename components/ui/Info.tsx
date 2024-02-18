type InfoProps = {
  children?: React.ReactNode;
}

const Info = ({ children }: InfoProps) => {
  return (
    <div className="group relative cursor-pointer w-[18px] h-[18px] bg-pale-slate rounded-full flex justify-center items-center text-xs leading-none text-tertiary font-black">
      ?
      <div className="tooltip-text hidden bottom-8 absolute bg-white p-6 rounded-2xl w-[290px] shadow-lg group-hover:block text-black text-sm font-medium">
        {children}
      </div>
    </div>
  )
}

export default Info;
