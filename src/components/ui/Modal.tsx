'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error';
}

export default function Modal({ isOpen, onClose, title, message, type = 'success' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-[#3b3935] rounded-[16px] shadow-2xl max-w-md w-full overflow-hidden"
            >
              {/* Header */}
              <div className={`p-6 ${type === 'success' ? 'bg-[#8b7355]/20' : 'bg-red-900/20'}`}>
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    type === 'success' ? 'bg-[#8b7355]' : 'bg-red-600'
                  }`}>
                    {type === 'success' ? (
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Title */}
                  <h3 
                    className="text-[24px] font-normal text-white flex-1"
                    style={{ fontFamily: 'Maname' }}
                  >
                    {title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p 
                  className="text-[18px] font-normal leading-[160%] text-[#E6E4DC]"
                  style={{ fontFamily: 'DM Sans' }}
                >
                  {message}
                </p>
              </div>

              {/* Footer */}
              <div className="p-6 pt-0">
                <button
                  onClick={onClose}
                  className="w-full bg-[#8b7355] hover:bg-[#9d8264] text-white font-bold py-3 px-6 rounded-[6px] transition-colors duration-200"
                  style={{ fontFamily: 'DM Sans' }}
                >
                  OK
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
