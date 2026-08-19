import { useState } from "react";
import { X } from "lucide-react";
import { MENU_CATEGORIES } from "../../data/menuMockData";
import { validateMenuItem } from "../../utils/menuValidators";

const INK = "#1E1B16";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const RED = "#C1442D";
const STEEL = "#5C6B66";

const EMPTY_FORM = { name: "", category: MENU_CATEGORIES[0], price: "", description: "", emoji: "🍽️" };

export default function MenuItemForm({ initialValues, onSubmit, onCancel }) {
  const [values, setValues] = useState(initialValues ?? EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid, errors: validationErrors } = validateMenuItem(values);
    if (!valid) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(values);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg border shadow-lg p-6"
        style={{ borderColor: BORDER }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm" style={{ color: INK }}>
            {initialValues ? "Edit item" : "Add menu item"}
          </h3>
          <button type="button" onClick={onCancel} aria-label="Close">
            <X size={16} color={STEEL} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: STEEL }}>
              Name
            </label>
            <input
              value={values.name}
              onChange={handleChange("name")}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: errors.name ? RED : BORDER, "--tw-ring-color": MUSTARD }}
            />
            {errors.name && <p className="text-[11px] mt-1" style={{ color: RED }}>{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: STEEL }}>
                Category
              </label>
              <select
                value={values.category}
                onChange={handleChange("category")}
                className="w-full rounded-md border px-3 py-2 text-sm bg-white"
                style={{ borderColor: BORDER }}
              >
                {MENU_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: STEEL }}>
                Price (₹)
              </label>
              <input
                type="number"
                min="0"
                value={values.price}
                onChange={handleChange("price")}
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: errors.price ? RED : BORDER, "--tw-ring-color": MUSTARD }}
              />
              {errors.price && <p className="text-[11px] mt-1" style={{ color: RED }}>{errors.price}</p>}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: STEEL }}>
              Description
            </label>
            <textarea
              value={values.description}
              onChange={handleChange("description")}
              rows={2}
              className="w-full rounded-md border px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2"
              style={{ borderColor: BORDER, "--tw-ring-color": MUSTARD }}
            />
          </div>

          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: STEEL }}>
              Emoji icon
            </label>
            <input
              value={values.emoji}
              onChange={handleChange("emoji")}
              maxLength={2}
              className="w-16 rounded-md border px-3 py-2 text-sm text-center focus:outline-none focus:ring-2"
              style={{ borderColor: BORDER, "--tw-ring-color": MUSTARD }}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-md text-sm font-semibold border"
            style={{ borderColor: BORDER, color: STEEL }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 rounded-md text-sm font-semibold text-white"
            style={{ background: MUSTARD }}
          >
            {initialValues ? "Save changes" : "Add item"}
          </button>
        </div>
      </form>
    </div>
  );
}
