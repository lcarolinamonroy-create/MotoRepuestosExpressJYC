import {useState} from "react";

export default function ProductFilters({onFilter}){
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  function handleSearchChange(event){
    const newText = event.target.value;
    setSearchText(newText);
    onFilter({searchText: newText, selectedCategory});
  }

  function handleCategoryChange(event){
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    onFilter({searchText, selectedCategory: newCategory});
  }

  return <section className="product-filters" aria-label="Filtros de productos">
    <label>
      Buscar producto
      <input
        type="search"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Ejemplo: llanta"
      />
    </label>
    <label>
      Categoría
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Todas</option>
        <option value="aceite">Aceites</option>
        <option value="llanta">Llantas</option>
        <option value="frenos">Frenos</option>
        <option value="transmision">Transmisión</option>
        <option value="lubricantes">Lubricantes</option>
        <option value="accesorios">Accesorios</option>
      </select>
    </label>
  </section>;
}
