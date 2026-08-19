import { useState } from "react";
import { X } from "lucide-react";
import { COUNTERS } from "../../data/slotsMockData";
import { validateSlot } from "../../utils/slotValidators";

const INK = "#1E1B16";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const RED = "#C1442D";
const STEEL = "#5C6B66";

const EMPTY_FORM = { time: "", counter: COUNTERS[0], capacity: "" };

export default function SlotForm({ initialValues, onSubmit, onCancel }) {
  const [values, setValues] = useState(initialValues ?? EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid, errors: validationErrors } = validateSlot(values);
    if (!valid) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(values);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-lg border shadow-lg p-6" style={{ borderColor: BORDER }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm" style={{ color: INK }}>
            {initialValues ? "Edit slot" : "Add pickup slot"}
          </h3>
          <button type="button" onClick={onCancel} aria-label="Close">
            <X size={16} color={STEEL} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: STEEL }}>
              Time (e.g. 2:00 PM)
            </label>
            <input
              value={values.time}
              onChange={handleChange("time")}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: errors.time ? RED : BORDER, "--tw-ring-color": MUSTARD }}
            />
            {errors.time && <p className="text-[11px] mt-1" style={{ color: RED }}>{errors.time}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: STEEL }}>
                Counter
              </label>
              <select
                value={values.counter}
                onChange={handleChange("counter")}
                className="w-full rounded-md border px-3 py-2 text-sm bg-white"
                style={{ borderColor: BORDER }}
              >
                {COUNTERS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: STEEL }}>
                Capacity
              </label>
              <input
                type="number"
                min="1"
                value={values.capacity}
                onChange={handleChange("capacity")}
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: errors.capacity ? RED : BORDER, "--tw-ring-color": MUSTARD }}
              />
              {errors.capacity && <p className="text-[11px] mt-1" style={{ color: RED }}>{errors.capacity}</p>}
            </div>
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
          <button type="submit" className="flex-1 py-2.5 rounded-md text-sm font-semibold text-white" style={{ background: MUSTARD }}>
            {initialValues ? "Save changes" : "Add slot"}
          </button>
        </div>
      </form>
    </div>
  );
}
