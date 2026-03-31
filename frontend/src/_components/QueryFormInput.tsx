'use client'

import { useRouter, useSearchParams } from "next/navigation";
import FormInput from "@/_components/FormInput";

export default function QueryFormInput({
  name,
  label,
  defaultValue,
  type = "text",
}: {
  name: string;
  label?: string;
  defaultValue?: string;
  type?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <FormInput
      name={name}
      label={label}
      type={type}
      defaultValue={defaultValue}
      onInputChange={handleChange}
    />
  );
}