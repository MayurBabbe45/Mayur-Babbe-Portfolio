import React from "react";

interface MetricCardProps {
  id: string;
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({ id, label, value, description, icon }) => {
  return (
    <div
      id={id}
      className="relative flex flex-col p-6 bg-[#09090B] border border-[#18181B] hover:border-[#3B82F6]/50 transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#3B82F6]/5 to-transparent rounded-full blur-2xl group-hover:from-[#3B82F6]/10 transition-all duration-500" />
      
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#A1A1AA] font-mono">{label}</span>
        <div className="p-2 bg-[#18181B] text-[#3B82F6] border border-[#27272A] group-hover:text-white group-hover:bg-[#3B82F6]/10 transition-all duration-300">
          {icon}
        </div>
      </div>
      
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold tracking-tighter text-[#FAFAFA] transition-colors duration-200">
          {value}
        </span>
      </div>
      
      <p className="mt-2 text-xs text-[#71717A] leading-relaxed">
        {description}
      </p>
    </div>
  );
};
