import api from "@/lib/axios";

export async function uploadResume(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const res = await api.post(
    "/resume/analyze",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
}

export async function getResumeStatus(id: number) {
  const res = await api.get(`/resume/status/${id}`);

  return res.data;
}

export async function getResumeHistory() {
  const res = await api.get("/resume/history");

  return res.data;
}