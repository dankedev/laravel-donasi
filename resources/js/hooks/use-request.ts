import { FormValue } from "@/types";
import { useForm } from "@inertiajs/react";
import { UseFormInput, useForm as useMantineForm } from "@mantine/form";
import { useEffect } from "react";


type FormProps<Values> = UseFormInput<Values>;

// type DefaultValue = string|number|object|boolean;
export function useRequest<Values extends Record<string, unknown> = Record<string, unknown>>(
    props?: FormProps<Values>
) {
    const form = useMantineForm<Values>(props);
    const { errors, setData, data, ...other } = useForm();

    useEffect(() => {
        // @ts-ignore
        setData(form.values as unknown as typeof form.values);
    });

    useEffect(() => {
        form.setErrors(errors);
    }, [errors, form]);

    return { ...other, ...form, data };
}

export type UseRequestProps<Values extends Record<string, FormValue>> = ReturnType<
    typeof useRequest<Values>
>;
