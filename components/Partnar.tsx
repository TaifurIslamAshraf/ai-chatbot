import Image from "next/image";
import Marquee from "react-fast-marquee";
const Partnar = () => {
  return (
    <Marquee autoFill>
      <Image
        src="/Google.png"
        alt="partnar logo"
        width={150}
        height={30}
        className="px-5"
      />
      <Image
        src="/Envato-color.png"
        alt="partnar logo"
        width={150}
        height={30}
        className="px-5"
      />
      <Image
        src="/Moodle-color.png"
        alt="partnar logo"
        width={150}
        height={30}
        className="px-5"
      />
      <Image
        src="/Slack-color.png"
        alt="partnar logo"
        width={150}
        height={30}
        className="px-5"
      />
      <Image
        src="/Upwork-color.png"
        alt="partnar logo"
        width={150}
        height={30}
        className="px-5"
      />
    </Marquee>
  );
};

export default Partnar;
