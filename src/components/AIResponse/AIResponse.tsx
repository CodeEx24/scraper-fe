import type { FC } from 'react';
import { BotIcon } from 'lucide-react';

export const AIResponse: FC<{ message: string }> = ({ message }) => (
  <div className="justify-center mt-6 w-full">
    <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-6 shadow">
      <div className="flex items-center mb-2 w-full">
        <BotIcon className="w-5 h-5 text-blue-500 mr-2" />
        <span className="font-semibold text-blue-700">AI Response</span>
      </div>
      <div className="text-gray-800 whitespace-pre-line mb-4">{message}</div>
    </div>
  </div>
);
