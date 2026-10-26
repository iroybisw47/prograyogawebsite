type DemoVideoProps = {
  src: string;
  poster: string;
  title: string;
};

/** A looping product demo inside the 9:16 cream frame. */
export function DemoVideo({ src, poster, title }: DemoVideoProps) {
  return (
    <div className="mx-auto flex min-w-0 max-w-[400px] flex-[1_1_320px] justify-center">
      <div className="aspect-9/16 w-full max-w-[360px] overflow-hidden rounded-[24px] bg-frame">
        <video
          className="block h-full w-full object-cover"
          src={src}
          poster={poster}
          title={title}
          aria-label={title}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    </div>
  );
}
