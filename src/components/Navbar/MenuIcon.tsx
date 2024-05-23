interface Props {
  open: boolean;
  setOpen: () => void;
}

const MenuIcon = ({ open, setOpen }: Props) => {
  return (
    <button
      data-testid="nav-menu-button"
      className="flex flex-col items-center justify-center"
      onClick={setOpen}
    >
      <span
        className={`block h-1 w-6 rounded-[--radius] bg-[--menu] transition-all duration-300 ease-out ${open ? "translate-y-1.5 rotate-45" : "-translate-y-.5"}`}
      ></span>
      <span
        className={`my-0.5 block h-1 w-6 rounded-[--radius] bg-[--menu] transition-all duration-300 ease-out ${open ? "opacity-0" : "opacity-100"}`}
      ></span>
      <span
        className={`block h-1 w-6 rounded-[--radius] bg-[--menu] transition-all duration-300 ease-out ${open ? "-translate-y-1.5 -rotate-45" : "translate-y-.5"}`}
      ></span>
    </button>
  );
};

export default MenuIcon;
