import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<any>;
}

const PasswordField = ({ register }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <fieldset className="h-fit">
      <Label htmlFor="password">Password:</Label>
      <Input
        type={visible ? "text" : "password"}
        id="password"
        placeholder="password"
        {...register("password")}
      />
      <span
        onClick={() => setVisible(!visible)}
        className="relative right-[.8em] top-[-1.7em] float-right cursor-pointer"
      >
        {visible ? (
          <EyeOff size={16} color="gray" />
        ) : (
          <Eye size={16} color="gray" />
        )}
      </span>
    </fieldset>
  );
};

export default PasswordField;
