import Image from "next/image";
import { motion } from "framer-motion";
import intoTheFuse from "@/assets/into-the-fuse.svg";
import SignUpInvite from "./SignUpInvite";
import SignUpTwitter from "./SignUpTwittter";
import SignUpWallet from "./SignUpWallet";

const SignUp = () => {
  return (
    <motion.div
      className="w-8/9 flex flex-col items-center mt-[86px] mb-[187px] md:w-9/10 max-w-7xl"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <Image
        src={intoTheFuse}
        alt="into the Fuse"
        width={365}
        height={165}
      />
      <p className="text-xl text-white text-center max-w-[549px] mt-[52px] mb-16">
        Join the Fuse Airdrop program Join the Fuse Airdrop program Join the Fuse Airdrop program
      </p>
      <div className="flex flex-col gap-5">
        <SignUpInvite />
        <SignUpTwitter />
        <SignUpWallet />
      </div>
    </motion.div>
  )
}

export default SignUp;
