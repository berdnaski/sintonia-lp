"use client";

import { useAuth } from "@/hooks/use-auth"
import { Metrics } from "@/components/metrics/page"
import { useCouple } from "@/hooks/use-couple";
import { useState, type FormEvent } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import api from "@/services/api";

export default function Dashboard() {
  const { user } = useAuth()
  const { couple } = useCouple();
  const [files, setFiles] = useState<FileList | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  async function handleUploadFile(e: FormEvent) {
    e.preventDefault()

    if (!files || files.length === 0) {
      toast.error('Please select a file first');
      return;
    }

    const file = files[0]
    const allowedTypes = ['video/mp4', 'image/jpeg', 'image/png', 'image/jpg'];

    if (!allowedTypes.includes(file.type)) {
      toast.error('File type not supported. Please upload MP4, JPEG, JPG or PNG files.');
      return;
    }

    setIsUploading(true)

    try {
      await api.post('uploads', {
        file,
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      toast.success('File uploaded successfully!');
      setFiles(null);
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.message || 'Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="p-4 sm:p-6 max-w-[1500px] mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Olá,{' '}
        {user && !couple && user.name}
        {user && couple && `${couple.user1.name} & ${couple.user2.name}`}
      </h1>

      <h2 className="text-lg text-gray-600 mb-6">Veja como está o seu relacionamento hoje</h2>

      <div>
        <Metrics />

        <div>
          <form onSubmit={handleUploadFile}>
            <input
              type="file"
              name="file"
              accept="video/mp4,image/jpeg,image/png,image/jpg"
              onChange={e => setFiles(e.target.files)}
              disabled={isUploading}
            />
            <button
              type="submit"
              disabled={isUploading}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
