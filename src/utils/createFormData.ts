interface CreateFormDataProps {
  [p: string]: string | Blob | File;
}

export function createFormData(data?: CreateFormDataProps) {
  const formData = new FormData();

  if (data) {
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
  }

  return formData;
}