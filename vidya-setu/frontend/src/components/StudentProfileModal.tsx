import { useState } from "react";

interface StudentProfile {
    name: string;
    age: number;
    grade: string;
}

interface StudentProfileModalProps {
    onSave: (profile: StudentProfile) => void;
    language: string;
    t: any;
}

export function StudentProfileModal({ onSave, language, t }: StudentProfileModalProps) {
    const [name, setName] = useState("");
    const [age, setAge] = useState<number | "">("");
    const [grade, setGrade] = useState("");

    const isKannada = language === "kn";

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (name.trim() && age && grade.trim()) {
            onSave({ name: name.trim(), age: Number(age), grade: grade.trim() });
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-icon">👋</div>
                    <h2 className="modal-title">
                        {t?.welcomeToVidyaSetu || "Welcome to Vidya-Setu!"}
                    </h2>
                    <p className="modal-subtitle">
                        {t?.tellUsAboutYourself || "Tell us a bit about yourself so AI can personalize your lessons."}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="modal-field">
                        <label className="modal-label">
                            {t?.yourName || "Your Name"}
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t?.namePlaceholder || "e.g. Rahul"}
                            className="modal-input"
                        />
                    </div>

                    <div className="modal-row">
                        <div className="modal-field">
                            <label className="modal-label">
                                {t?.age || "Age"}
                            </label>
                            <input
                                type="number"
                                required
                                min="5"
                                max="18"
                                value={age}
                                onChange={(e) => setAge(parseInt(e.target.value) || "")}
                                placeholder="e.g. 12"
                                className="modal-input"
                            />
                        </div>

                        <div className="modal-field">
                            <label className="modal-label">
                                {t?.classGrade || "Class / Grade"}
                            </label>
                            <select
                                required
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                className="modal-input"
                            >
                                <option value="" disabled>{t?.select || "Select"}</option>
                                {[5, 6, 7, 8, 9, 10, 11, 12, "College Degree", "Researcher"].map(num => (
                                    <option key={num} value={num.toString()}>
                                        {typeof num === "number" ? `${t?.classPrefix || "Class"} ${num}` : (num === "College Degree" ? (t?.collegeDegree || "College Degree") : (t?.researcher || "Researcher"))}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!name.trim() || !age || !grade.trim()}
                        className="modal-submit-btn"
                    >
                        {isKannada ? "ಪ್ರಾರಂಭಿಸಿ! 🚀" : "Let's Start! 🚀"}
                    </button>
                </form>
            </div>
        </div>
    );
}
