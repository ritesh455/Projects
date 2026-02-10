import { useNavigate } from "react-router-dom";
import { useTemplate } from "../context/TemplateContext";

export default function Templates() {
  const navigate = useNavigate();
  const { setTemplate } = useTemplate();

  const selectTemplate = (id: string) => {
    setTemplate(id);
    navigate("/resume-builder");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Choose a Template</h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Template 1 */}
        <div onClick={() => selectTemplate("template1")}
         className="bg-white h-72 rounded-xl shadow-md flex items-center justify-center overflow-hidden p-4">
            <img 
    src="/templates/defaultResume1.png" 
    alt="Template 1" 
    className="max-h-full max-w-full object-contain rounded-md shadow-sm"
            />
        </div>

        {/* Template 2 */}
        <div onClick={() => selectTemplate("template2")}
         className="bg-white h-72 rounded-xl shadow-md flex items-center justify-center overflow-hidden p-4">
            <img 
    src="/templates/modernResume2.png" 
    alt="Template 2" 
    className="max-h-full max-w-full object-contain rounded-md shadow-sm"
            />
        </div>


        {/* Template 3 */}
        {/* <div
          className="border p-3 cursor-pointer hover:shadow"
          onClick={() => selectTemplate("template3")}
        >
          <img src="/templates/clasicResume3.png" alt="Template 3" />
          <p className="text-center mt-2">Minimal</p>
        </div> */}

        <div onClick={() => selectTemplate("template3")}
         className="bg-white h-72 rounded-xl shadow-md flex items-center justify-center overflow-hidden p-4">
            <img 
    src="/templates/clasicResume3.png" 
    alt="Template 3" 
    className="max-h-full max-w-full object-contain rounded-md shadow-sm"
            />
        </div>


      </div>
    </div>
  );
}
