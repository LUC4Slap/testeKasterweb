type IRuntimeForm = {
    [key: string]: any;
};

export class RunTimeForm<T extends IRuntimeForm>{
    public formData(inputs: T): FormData {
        const form = new FormData();
        for (const key in inputs) {
            if (inputs[key] !== undefined) {
                form.append(key, inputs[key]);
            }
        }
        return form;
    }
}

