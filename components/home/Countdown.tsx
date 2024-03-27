import { useEffect, useState } from "react";

const Countdown = () => {
  const [remainingTime, setRemainingTime] = useState({ day: "00", hour: "00", minute: "00", second: "00" })

  function timer(futureTime: Date): { day: string, hour: string, minute: string, second: string } {
    const currentTime = new Date();
    const timeDifference = futureTime.getTime() - currentTime.getTime();

    if (timeDifference <= 0) {
      return { day: '00', hour: '00', minute: '00', second: '00' };
    }

    const oneDay = 24 * 60 * 60 * 1000;
    const days = Math.floor(timeDifference / oneDay);
    const hours = Math.floor((timeDifference % oneDay) / (60 * 60 * 1000));
    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

    const day = String(days).padStart(2, '0');
    const hour = String(hours).padStart(2, '0');
    const minute = String(minutes).padStart(2, '0');
    const second = String(seconds).padStart(2, '0');

    return { day, hour, minute, second };
  }

  useEffect(() => {
    // April 10, 2024 12:00 UTC
    const futureTime = new Date(Date.UTC(2024, 3, 10, 12, 0, 0));

    const intervalId = setInterval(() => {
      setRemainingTime(timer(futureTime));
    }, 1000)

    return () => {
      clearInterval(intervalId);
    }
  }, [])

  return (
    <div className="flex gap-2.5 md:gap-1.5">
      <div className="flex flex-col justify-center items-center gap-2.5 md:gap-1.5 bg-cactus rounded-[30px] md:rounded-2xl leading-none w-[109px] h-[107px] md:w-20 md:h-20">
        <p className="text-[3.125rem] md:text-xl text-primary font-bold">
          {remainingTime.day}
        </p>
        <p className="text-sm md:text-xs text-primary">
          days
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-2.5 md:gap-1.5 bg-cactus rounded-[30px] md:rounded-2xl leading-none w-[109px] h-[107px] md:w-20 md:h-20">
        <p className="text-[3.125rem] md:text-xl text-primary font-bold">
          {remainingTime.hour}
        </p>
        <p className="text-sm md:text-xs text-primary">
          hours
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-2.5 md:gap-1.5 bg-cactus rounded-[30px] md:rounded-2xl leading-none w-[109px] h-[107px] md:w-20 md:h-20">
        <p className="text-[3.125rem] md:text-xl text-primary font-bold">
          {remainingTime.minute}
        </p>
        <p className="text-sm md:text-xs text-primary">
          minutes
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-2.5 md:gap-1.5 bg-cactus rounded-[30px] md:rounded-2xl leading-none w-[109px] h-[107px] md:w-20 md:h-20">
        <p className="text-[3.125rem] md:text-xl text-primary font-bold">
          {remainingTime.second}
        </p>
        <p className="text-sm md:text-xs text-primary">
          seconds
        </p>
      </div>
    </div>
  )
}

export default Countdown;
