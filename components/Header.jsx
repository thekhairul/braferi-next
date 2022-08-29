import Image from 'next/image';

function Header() {
  return (
    <div className="app-header px-4 py-2 border-b border-gray-300">
      <div className="flex justify-between items-center container mx-auto">
        <Image src="/images/braferi-logo.webp" width={100} height={50} alt="Braferi Logo"/>
        {/* searchbar */}
        {/* navbar */}
      </div>
    </div>
  );
}

export default Header;
