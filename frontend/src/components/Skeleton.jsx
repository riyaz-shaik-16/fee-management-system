const SkeletonPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6 sm:p-10">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-10">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-2/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-3 gap-4 items-center border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
          <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded mt-6"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPage;
