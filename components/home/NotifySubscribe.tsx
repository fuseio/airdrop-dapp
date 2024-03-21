const NotifySubscribe = () => {
  return (
    <>
      <p className="text-xl text-white font-bold mb-5">
        Get notified when the airdrop is live
      </p>
      <form
        className="flex flex-row md:flex-col items-center gap-5 md:gap-3 z-10"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          name="email"
          placeholder="Your email"
          required
          className="flex gap-2 bg-oslo-gray/30 rounded-full text-xl leading-none text-white px-[30px] py-3.5 focus:outline-none placeholder:text-white"
        />
        <button
          type="submit"
          className="transition ease-in-out bg-primary rounded-full text-xl leading-none font-semibold px-12 py-4 md:w-full hover:bg-white"
        >
          Subscribe
        </button>
      </form>
    </>
  )
}

export default NotifySubscribe;
