import React from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';

interface ILoadingOverlayProps {
    isLoading:boolean
}
const LoadingOverlay:React.FC<ILoadingOverlayProps> = ({ isLoading }) => {
  return isLoading && (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center`}
      data-testid="loading-overlay"
    >
      <Spinner size={SpinnerSize.large} />
    </div>
  );
};

export default LoadingOverlay;
