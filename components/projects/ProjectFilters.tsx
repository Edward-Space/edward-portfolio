"use client";

import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SimpleSelect } from "@/components/ui/simple-select";

interface ProjectFiltersProps {
  onSearch: (search: string) => void;
  onCategoryFilter: (category: string) => void;
  categories: string[];
  currentSearch: string;
  currentCategory: string;
  loading?: boolean;
}

export const ProjectFilters = ({
  onSearch,
  onCategoryFilter,
  categories,
  currentSearch,
  currentCategory,
  loading = false,
}: ProjectFiltersProps) => {
  const [searchValue, setSearchValue] = useState(currentSearch);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const clearFilters = () => {
    setSearchValue('');
    onSearch('');
    onCategoryFilter('');
  };

  const hasActiveFilters = currentSearch || currentCategory;

  const categoryOptions = [
    { value: '', label: 'Tất cả' },
    ...categories.map(cat => ({ value: cat, label: cat }))
  ];

  return (
    <div className="space-y-4 mb-6 gap-5">
      {/* Search */}
      <form onSubmit={handleSearchSubmit} className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Tìm kiếm dự án..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10 pr-4"
          disabled={loading}
        />
        {searchValue && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchValue('');
              onSearch('');
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <SimpleSelect
          value={currentCategory}
          onValueChange={onCategoryFilter}
          options={categoryOptions}
          placeholder="Chọn công nghệ"
          disabled={loading}
          className="w-[180px]"
        />

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="h-8"
          >
            <X className="h-4 w-4 mr-1" />
            Xóa bộ lọc
          </Button>
        )}
      </div>

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {currentSearch && (
            <Badge variant="secondary" className="gap-1">
              Tìm kiếm: "{currentSearch}"
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => {
                  setSearchValue('');
                  onSearch('');
                }}
              />
            </Badge>
          )}
          {currentCategory && (
            <Badge variant="secondary" className="gap-1">
              Công nghệ: {currentCategory}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onCategoryFilter('')}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};