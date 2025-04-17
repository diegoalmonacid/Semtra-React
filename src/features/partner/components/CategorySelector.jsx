

export const CategorySelector = ({ categories, formCategory, setFormCategory, className, fetchData }) => {
    const handleChange = async (event) => {
        setFormCategory(event.target.value);
    }
    return (
        <div className={`flex gap-4 mb-4 flex-col ${className}`}>
          <div className="flex-auto">
            <label
              htmlFor="category"
              className="block text-sm font-medium"
            >
              Categoría
            </label>
            <select
              id="category"
              name="category"
              value={formCategory}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="0" disabled>Seleccione...</option>
              {categories.map((category) => (<option key={category.categoryId} value={category.categoryId ?? ""}>{category.name??""}</option>))}
            </select>
          </div>
        </div>
    )
}