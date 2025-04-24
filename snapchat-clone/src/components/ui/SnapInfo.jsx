import Image from "next/image";

export default function SnapInfo({ src, name, author }) {
  return (
    <div className="group transition transform hover:scale-105 cursor-pointer">
      <div className="relative rounded-xl overflow-hidden border-2 border-transparent group-hover:border-yellow-400 transition">
        <Image
          src={src}
          alt={name}
          width={300}
          height={300}
          className="rounded-xl object-cover"
        />
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-semibold group-hover:text-yellow-500">{name}</h3>
        <p className="text-xs text-gray-500">{author}</p>
      </div>
    </div>
  );
}
