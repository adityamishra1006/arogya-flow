import { useState } from "react";
import Button from "../common/Button";
import { createDoctor } from "../../api/doctorApi";

export default function CreateDoctorModal({ onClose, onSuccess }) {

    const [form, setForm] = useState({
        name: "",
        specialization: "",
        maxTokenPerSlot: ""  // ✅ Default value
    });

    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: name === "maxTokenPerSlot"
                ? Number(value)   // ✅ ensure number
                : value
        });
    };

    const handleSubmit = async () => {
        try {
            setSaving(true);

            await createDoctor(form);

            onSuccess(); // refresh list
            onClose();   // close modal
        } catch (err) {
            console.error(
                "Doctor creation failed",
                err.response?.data || err
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

            <div className="bg-white rounded-xl shadow-xl p-6 w-[420px]">

                <h2 className="text-lg font-semibold mb-4">
                    Create Doctor
                </h2>

                {/* ✅ Doctor Name */}
                <input
                    type="text"
                    name="name"
                    placeholder="Doctor Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 mb-3"
                />

                {/* ✅ Specialization */}
                <input
                    type="text"
                    name="specialization"
                    placeholder="Specialization"
                    value={form.specialization}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 mb-3"
                />

                {/* ✅ Max Token Per Slot */}
                <input
                    type="number"
                    name="maxTokenPerSlot"
                    min="1"
                    value={form.maxTokenPerSlot}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 mb-4"
                />

                <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button onClick={handleSubmit} disabled={saving}>
                        {saving ? "Saving..." : "Create"}
                    </Button>
                </div>

            </div>
        </div>
    );
}
