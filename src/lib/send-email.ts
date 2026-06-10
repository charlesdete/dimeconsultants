interface ContactFormData {
  name: string;
  email: string;
  organisation: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to send email");
  }

  return await response.json();
}
