import toast from "react-hot-toast";

export default function Button({ image, loading }) {
  const CopyToClipboard = (link) => {
    const copyBtn = document.querySelector("#copy");

    const ToggleIcon = () => {
      copyBtn.firstChild.classList.toggle("hidden");
      copyBtn.lastChild.classList.toggle("hidden");
    };

    navigator.clipboard.writeText(link);
    ToggleIcon();

    toast.success("Copied", {
      icon: "✅",
    });

    setTimeout(() => {
      ToggleIcon();
    }, 500);
  };
  return (
    <div className="w-full">
      <div className="flex items-center">
        <button
          type="submit"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-8 text-sm font-medium text-center text-white bg-blue-700 dark:bg-blue-600 border hover:bg-blue-800 dark:hover:bg-blue-700 rounded-s-lg border-blue-700 dark:border-blue-600 hover:border-blue-700 dark:hover:border-blue-700 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          Generate
        </button>
        <div className="relative w-full overflow-clip">
          <input
            type="text"
            value={loading ? "Loading..." : image}
            aria-describedby="helper-text-explanation"
            className={`bg-gray-50 border border-e-0 border-gray-300 text-gray-500 dark:text-gray-400 text-sm border-s-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              loading && "animate-pulse"
            }`}
            readOnly
            disabled
          />
        </div>
        <button
          id="copy"
          className='lex-shrink-0 py-3 px-4 text-gray-500 bg-gray-100 border border-gray-300 rounded-e-lg  dark:bg-gray-700 dark:border-gray-600 "hover:bg-gray-200 focus:outline-none focus:ring-gray-100 hover:text-blue-600 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:hover:text-blue-500 dark:text-gray-400'
          type="button"
          onClick={() => CopyToClipboard(image)}
        >
          <span>
            <svg
              className="size-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"></path>
            </svg>
          </span>
          <span className="hidden items-center text-black dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              aria-hidden="true"
              className="size-4"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              ></path>
            </svg>
          </span>
        </button>
        <div className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"></div>
      </div>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Make sure that your URL is valid
      </p>
    </div>
  );
}
