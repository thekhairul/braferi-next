import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { TbShoppingCart } from "react-icons/tb";

const SidebarNoSSR = dynamic(() => import("@/components/Sidebar"), { ssr: false });

function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="app-header px-4 py-2 shadow relative">
      <div className="flex justify-between items-center container mx-auto">
        <Image src="/images/braferi-logo.webp" width={100} height={50} alt="Braferi Logo" />
        {/* searchbar */}
        <nav>
          <ul className="inline-flex gap-2 items-center list-none">
            <li>
              <button className="text-accent" onClick={() => setSidebarOpen(true)}>
                <TbShoppingCart className="text-2xl" />
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <SidebarNoSSR appendTo="#sidebars" isOpen={isSidebarOpen} closeSidebar={closeSidebar}>
        <p>Hi there</p>
      </SidebarNoSSR>
    </div>
  );
}

export default Header;
