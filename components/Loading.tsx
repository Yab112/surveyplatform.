// components/GithubLoader.tsx
import { FileSpreadsheet } from 'lucide-react';
const  GithubLoader = () => {
  return (
    <div className="relative flex items-center justify-center h-24 w-24">
      {/* Outer ring - slow counter-clockwise */}
      <div className="absolute h-full w-full border-4 border-blue-400/30 border-t-blue-600 rounded-full animate-[spin_2s_linear_infinite]" />

      {/* Middle ring - fast clockwise */}
      <div className="absolute h-3/4 w-3/4 border-4 border-purple-400/30 border-b-purple-600 rounded-full animate-[spin_1s_linear_infinite_reverse]" />

      {/* GitHub logo with ping animation */}
      <FileSpreadsheet className="h-8 w-8 text-gray-800 dark:text-gray-200 animate-ping" />
    </div>
  );
};

export default GithubLoader;