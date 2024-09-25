"use client";

export const Header = () => {
  const handleScrollToSection = (
    sectionId: string,
    event: React.MouseEvent<HTMLAnchorElement>
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
    <div className="flex justify-center items-center fixed top-3 w-full z-10">
      <nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
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
