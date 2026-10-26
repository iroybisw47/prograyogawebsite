import Image from "next/image";
import Link from "next/link";

const SRC = {
  navy: "/images/progra-wordmark-blue.png",
  purple: "/images/progra-wordmark-purple.png",
};

export function Wordmark({
  height,
  color = "navy",
  eager,
}: {
  height: number;
  color?: keyof typeof SRC;
  eager?: boolean;
}) {
  return (
    <Link href="/" aria-label="Progra home" className="flex items-center">
      <Image
        src={SRC[color]}
        alt="Progra"
        width={986}
        height={242}
        loading={eager ? "eager" : undefined}
        style={{ height, width: "auto" }}
        className="block"
      />
    </Link>
  );
}
