// import { useTheme } from "next-themes";

import { ThemeToggleButton } from "../ui/skiper-ui/skiper26";

export function ThemeToggle() {
  // const { resolvedTheme, setTheme } = useTheme();

  // const toggleTheme = () => {
  //   setTheme(resolvedTheme === "dark" ? "light" : "dark");
  // };
  return (
    <div className="flex items-center justify-center p-6">
      <ThemeToggleButton
        variant="gif"
        gifUrl="https://media.giphy.com/media/5PncuvcXbBuIZcSiQo/giphy.gif?cid=ecf05e47j7vdjtytp3fu84rslaivdun4zvfhej6wlvl6qqsz&ep=v1_stickers_search&rid=giphy.gif&ct=s"
        // gifUrl="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3JwcXdzcHd5MW92NWprZXVpcTBtNXM5cG9obWh0N3I4NzFpaDE3byZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/WgsVx6C4N8tjy/giphy.gif"
      />
    </div>
  );
}
