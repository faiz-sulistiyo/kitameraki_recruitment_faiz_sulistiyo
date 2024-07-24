import { Spinner } from '@fluentui/react-components';
import React from 'react';

interface ILoadingOverlayProps {
    isLoading:boolean
}
const LoadingOverlay:React.FC<ILoadingOverlayProps> = ({ isLoading }) => {
  return isLoading && (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center`}
      data-testid="loading-overlay"
    >
      <Spinner />
    </div>
  );
};

export default LoadingOverlay;
