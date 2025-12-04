import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormSelectFieldProps<T extends string> {
  id: string;
  label: string;
  value: T | "";
  placeholder: string;
  options: readonly T[];
  onValueChange: (value: T) => void;
}

export function FormSelectField<T extends string>({
  id,
  label,
  value,
  placeholder,
  options,
  onValueChange,
}: FormSelectFieldProps<T>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
