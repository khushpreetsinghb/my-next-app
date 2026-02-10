'use client';

import { useState } from 'react';
import useEscToClose from '@/utils/useEscToClose';

interface ImageModalProps {
  imageUrl: string;
  altText: string;
  triggerElement: React.ReactNode;
}

export default function ImageModal({ imageUrl, altText, triggerElement }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Use reusable ESC to close hook
  useEscToClose(isOpen, () => setIsOpen(false));

  return (
    <>
      {/* Trigger Element */}
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer hover:opacity-80 transition-opacity"
        aria-label={`View ${altText}`}
      >
        {triggerElement}
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60">
          <div className="relative w-full max-w-4xl rounded-lg bg-white px-2 py-1 shadow-xl">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-bold">Image Preview</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2 transition-all duration-200"
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Image Display */}
            <div className="flex justify-center">
              <img
                src={imageUrl}
                alt={altText}
                className="h-[65vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
