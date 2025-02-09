import useUserInfo from "@/hooks/useUserInfo";
import Image from "next/image";

export default function UserAvatar({
  sizeClass = "size-8",
}: {
  sizeClass?: string;
}) {
  const { user } = useUserInfo();
  if (!user) return null;
  return (
    <>
      {user.avatar ? (
        <Image
        priority
          className={`${sizeClass} rounded-full border-2 border-cyan-300`}
          src={user.avatar}
          alt={user.firstName}
          width={32}
          height={32}
        />
      ) : (
        <div
          className={`${sizeClass} flex items-center justify-center rounded-full border-2 border-cyan-300 bg-cyan-600/70 text-xl text-white select-none`}
        >
          {user.firstName.slice(0, 2).toUpperCase()}
        </div>
      )}
    </>
  );
}
