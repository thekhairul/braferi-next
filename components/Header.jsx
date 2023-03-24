import CartRoot from "@/components/CartRoot";
import SearchBar from "@/components/Searchbar";
import Image from "next/image";

function Header() {
  return (
    <div className="app-header bg-white container mx-auto px-4 py-2 shadow rounded-lg relative">
      <div className="flex justify-between items-center">
        <Image src="/images/braferi-logo.webp" width={100} height={50} alt="Braferi Logo" />
        <SearchBar />
        <nav>
          <ul className="inline-flex gap-2 items-center list-none">
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
