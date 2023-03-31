import CartRoot from "@/components/CartRoot";
import Filter from "@/components/Filter";
import SearchBar from "@/components/Searchbar";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";

const SidebarNoSSR = dynamic(() => import("@/components/Sidebar"), { ssr: false });

function Header() {
  const [isMobile, setIsMobile] = useState(true);
  const [isFilterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const isMobileScreen = window.matchMedia("(max-width: 767.99px)").matches;
    setIsMobile(isMobileScreen);
  }, []);

  const toggleFilters = (open = false) => {
    setFilterOpen(open);
  };

  return (
    <div className="app-header bg-white container mx-auto px-4 py-2 shadow rounded-lg relative">
      <div className="flex justify-between items-center">
        <Image src="/images/braferi-logo.webp" width={100} height={50} alt="Braferi Logo" />
        <SearchBar />
        <nav>
          <ul className="inline-flex gap-2 items-center list-none">
            <li>
              {isMobile && (
                <button className="p-2 hover:shadow-lg rounded-lg" onClick={() => toggleFilters(true)}>
                  <FiFilter className="text-3xl" />
                </button>
              )}
              <SidebarNoSSR
                position="start"
                appendTo="#sidebars"
                isOpen={isFilterOpen}
                closeSidebar={() => toggleFilters(false)}
              >
                <Filter />
              </SidebarNoSSR>
            </li>
            <li>
              <CartRoot />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
