import Input from "../common/Input";
import { useResume } from "../../context/ResumeContext";

export default function PersonalInfoForm() {
  const { resume, updateField } = useResume();

  return (
    <div>
      <h2 className="font-bold mb-2">Personal Info</h2>
      <Input label="Name" value={resume.name}
        onChange={e => updateField("name", e.target.value)} />
      <Input label="Email" value={resume.email}
        onChange={e => updateField("email", e.target.value)} />
      <Input label="Phone" value={resume.phone}
        onChange={e => updateField("phone", e.target.value)} />
    </div>
  );
}
