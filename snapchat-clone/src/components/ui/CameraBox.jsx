'use client';
import React, { useRef, useState, useEffect } from 'react';
import { MdOutlineCameraAlt } from 'react-icons/md';
import { FiX } from 'react-icons/fi';

export default function CameraBox() {
  const videoRef = useRef(null);
  const [isCameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Start camera only after rendering video element
  useEffect(() => {
    const enableCamera = async () => {
      if (isCameraActive && videoRef.current && !stream) {
        try {
          const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = newStream;
          setStream(newStream);
        } catch (err) {
          console.error('Camera error:', err);
          alert('Please allow camera access.');
        }
      }
    };

    enableCamera();

    // Stop camera on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraActive, stream]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setCameraActive(false);
    setPhoto(null);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/png');
    setPhoto(dataUrl);
  };

  return (
    <div className="bg-[#3a3a3a] w-72 h-96 flex flex-col items-center justify-center rounded-xl shadow-lg p-4 relative">
      {isCameraActive ? (
        <>
          <div className="relative w-full h-full mb-2">
            <button
              onClick={stopCamera}
              className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
              aria-label="Close Camera"
            >
              <FiX size={20} />
            </button>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full rounded-xl object-cover"
            />
          </div>

          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={capturePhoto}
              className="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition"
              aria-label="Capture Photo"
            >
              <MdOutlineCameraAlt size={24} />
            </button>
            {photo && (
              <img
                src={photo}
                alt="Captured"
                onClick={() => setShowPreview(true)}
                className="w-12 h-12 object-cover rounded-md cursor-pointer border border-white"
                title="Click to view full image"
              />
            )}
          </div>
        </>
      ) : (
        <button
          className="bg-gray-700 w-24 h-24 flex items-center justify-center rounded-full shadow-md hover:scale-105 transition-transform duration-200 mb-5"
          aria-label="Open Camera"
          onClick={() => setCameraActive(true)}
        >
          <MdOutlineCameraAlt size={48} className="text-white" />
        </button>
      )}

      {showPreview && photo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setShowPreview(false)}
        >
          <img src={photo} alt="Full Preview" className="max-w-full max-h-full rounded-lg shadow-xl" />
        </div>
      )}

      <p className="text-sm text-gray-200 mt-4">Click the Camera to send Snaps</p>
      <div className="flex gap-3 mt-4">
        <div className="w-4 h-4 bg-black rounded-full" />
        <div className="w-4 h-4 bg-red-600 rounded-full" />
        <div className="w-4 h-4 bg-gray-600 rounded-full" />
      </div>
    </div>
  );
}
