import CartRoot from "@/components/CartRoot";
import Image from "next/image";

function Header() {
  return (
    <div className="app-header px-4 py-2 shadow relative">
      <div className="flex justify-between items-center container mx-auto">
        <Image src="/images/braferi-logo.webp" width={100} height={50} alt="Braferi Logo" />
        {/* searchbar */}
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
