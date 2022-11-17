import { AiFillAlert } from "react-icons/ai";
import { InputField } from "../components/Forms";

const FormsPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <InputField label="username" startIcon={<AiFillAlert />} />
      <InputField
        name="email"
        label="email"
        endIcon={<AiFillAlert />}
        errorMessage="The email is required"
        placeholder="Email"
      />
    </div>
  );
};

export default FormsPage;
