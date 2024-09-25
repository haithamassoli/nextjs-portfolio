"use client";

export const Header = () => {
  const handleScrollToSection = (
    sectionId: string,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.offsetTop;
      const headerOffset = 80;

      window.scrollTo({
        top: sectionTop - headerOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed top-3 z-10 flex w-full items-center justify-center">
      <nav className="flex gap-1 rounded-full border border-white/15 bg-white/10 p-0.5 backdrop-blur">
        <a
          href="#"
          className="nav-item"
          onClick={(e) => handleScrollToSection("home", e)}
        >
          Home
        </a>
        <a
          href="#"
          className="nav-item"
          onClick={(e) => handleScrollToSection("projects", e)}
        >
          Projects
        </a>
        <a
          href="#"
          className="nav-item"
          onClick={(e) => handleScrollToSection("about", e)}
        >
          About
        </a>
        <a
          href="#"
          className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900"
          onClick={(e) => handleScrollToSection("contact", e)}
        >
          Contact
        </a>
      </nav>
    </div>
  );
};
