import {useState} from "react";
import Modal from "../common/Modal.jsx";
import Button from "../common/Button.jsx";

export default function BookSlotModal({ isOpen, onClose, onSubmit, slot }){
    const [patientName, setPatientName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        if (!patientName || !email) {
            alert("Please enter valid details");
            return;
        }

        onSubmit({
            slotId: slot.id,
            patientName: patientName,
            email: email,
        });

        setPatientName("");
        setEmail("");
    };


    return(
        <Modal
            isOpen={isOpen} onClose={onClose} title="Book slots"
            footer={
                <>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>
                        Submit
                    </Button>
                </>
            }
        >

            <div className="space-y-3">
                <input
                    className="w-full border rounded p-2"
                    placeholder="Patient Name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                />
                <input
                    className="w-full border rounded p-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

        </Modal>
    )
}