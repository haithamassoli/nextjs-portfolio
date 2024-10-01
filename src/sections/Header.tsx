export const Header = () => {
  return (
    <div className="fixed -top-16 z-50 flex w-full items-center justify-center">
      <nav className="animate-fade-in flex gap-1 rounded-full border border-white/15 bg-white/10 p-2 backdrop-blur">
        {["Home", "Experience", "Projects", "About", "Contact"].map(
          (item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              className={`nav-item ${
                item === "Experience" ? "hidden md:block" : ""
              } ${
                item === "Contact"
                  ? "bg-white text-gray-900 hover:bg-white/70"
                  : "hover:bg-white/10"
              }`}
            >
              {item}
            </a>
          ),
        )}
      </nav>
    </div>
  );
};
