import Filter from "@/components/Filter";
import Products from "@/components/Products";

export default function Home() {
  return (
    <div id="home" className="container mx-auto flex gap-4 py-6">
      <div className="w-1/4">
        <Filter />
      </div>
      <div className="w-3/4">
        <Products />
      </div>
    </div>
  )
}
