import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <AlertCircle size={20} />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;