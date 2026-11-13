import { ThemeToggleButton as Skiper26ThemeToggleButton } from "../ui/skiper-ui/skiper26";

export default function ThemeToggleButton() {
  return (
    <Skiper26ThemeToggleButton
      variant="circle"
      start="center"
      blur={true}
      className="size-10 bg-primary text-primary-foreground hover:bg-primary/85"
    />
  );
}
