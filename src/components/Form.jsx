import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "./Button";
import toast from "react-hot-toast";

export default function Form({ apiKey, defaultImage }) {
  const formData = new FormData();
  const onDrop = useCallback(
      (acceptedFiles) => console.info(acceptedFiles),
      []
    ),
    { getRootProps, getInputProps, acceptedFiles } = useDropzone({
      onDrop,
    });

  const [image, setImage] = useState(defaultImage);
  const [lastFile, setLastFile] = useState(acceptedFiles[0] ?? false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    acceptedFiles[0] && setLastFile(acceptedFiles[0]);
  }, [acceptedFiles]);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (!acceptedFiles[0]) {
      return () => clearTimeout(setTimeout(() => setLoading(false), 500));
    }

    try {
      formData.append("api_key", apiKey);
      formData.append("file", acceptedFiles[0]);
      formData.append("upload_preset", "arjhb0vs");

      const response = await fetch(
          "https://api.cloudinary.com/v1_1/dgs55s8qh/image/upload",
          {
            method: "POST",
            body: formData,
          }
        ),
        data = await response.json(),
        url = data.secure_url;

      setImage(url);
      toast.success("Generated!");
    } catch (error) {
      toast.error(error.message, {
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="flex flex-wrap justify-center gap-4" onSubmit={onSubmit}>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col flex-grow items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-800/20"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            fill="none"
            aria-hidden="true"
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            ></path>
          </svg>

          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <b>Click to upload</b> or drag and drop
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>

        <input
          {...getRootProps()}
          {...getInputProps()}
          id="dropzone-file"
          type="file"
          accept="image/*"
          className="hidden"
        />
      </label>

      <picture
        className={`sm:w-1/4 relative aspect-square rounded-lg overflow-hidden  ${
          loading && "animate-pulse"
        }`}
      >
        <img
          draggable="false"
          src={
            acceptedFiles[0]
              ? URL.createObjectURL(acceptedFiles[0])
              : lastFile
              ? URL.createObjectURL(lastFile)
              : defaultImage
          }
          className="object-cover object-center size-full"
          alt={image}
        />
      </picture>

      <Button loading={loading} image={image} />
    </form>
  );
}
