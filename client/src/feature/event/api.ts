import { api } from "../../lib/api";

export async function downloadPdf(eventId: string) {
  try {
    const response = await api.get(`/event/${eventId}/participants/pdf`, {
      responseType: "blob", //precoess the upcoming response raw,buffer,binary
    });

    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `participants-${eventId}.pdf`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("PDF download failed:", error);
    throw error;
  }
}
