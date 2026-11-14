import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

type Props = {
  name: string;
  image?: string;
};

export default function ParticipantAvatar({ name, image }: Props) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Avatar className="h-10 w-10">
      <AvatarImage src={image || ""} alt={name} />
      <AvatarFallback className="bg-slate-100 text-slate-700 font-semibold">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
