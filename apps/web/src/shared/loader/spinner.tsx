export const LoadingSpinner = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}
  >
    <div className="spinner w-9 h-9 rounded-[50%] border-l-[#09f] border-4 border-solid border-[rgba(0, 0, 0, 0.1)]" />
    <style jsx>{`
      .spinner {
        animation: spin 1s ease infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);
