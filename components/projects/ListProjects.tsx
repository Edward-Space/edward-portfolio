"use client";

import { useState } from "react";
import Image from "next/image";
import { IProject } from "@/model/projects";
import { Carousel3D } from "../Carousel3D";
import { Carousel3DGlobe } from "../Carousel3DGlobe";
import { AuroraText } from "../magicui/aurora-text";
import { motion } from "motion/react";
import { useProjects } from "@/hooks/useProjects";
import { ProjectFilters } from "./ProjectFilters";
import { Pagination } from "../ui/pagination";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

export const ListProjects = ({
  type,
}: {
  type: "GRID" | "CAROUSEL" | "GLOBE";
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const {
    projects,
    meta,
    loading,
    error,
    fetchProjects,
    categories,
    loadingCategories,
  } = useProjects({
    page: 1,
    limit: type === "GRID" ? 6 : 16, // More items for carousel/globe
  });

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    fetchProjects({ page: 1, search, category: selectedCategory });
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    fetchProjects({ page: 1, search: searchTerm, category });
  };

  const handlePageChange = (page: number) => {
    fetchProjects({ page, search: searchTerm, category: selectedCategory });
  };

  // Loading state
  if (loading && projects.length === 0) {
    return (
      <section className="w-full flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold tracking-tighter mb-8">
          <AuroraText>PROJECTS</AuroraText>
        </h1>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Đang tải dự án...</span>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="w-full flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold tracking-tighter mb-8">
          <AuroraText>PROJECTS</AuroraText>
        </h1>
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold tracking-tighter mb-8">
        <AuroraText>PROJECTS</AuroraText>
      </h1>

      {/* Filters - only show for GRID view */}
      {type === "GRID" && (
        <div className="w-full mb-8">
          <ProjectFilters
            onSearch={handleSearch}
            onCategoryFilter={handleCategoryFilter}
            categories={categories}
            currentSearch={searchTerm}
            currentCategory={selectedCategory}
            loading={loading || loadingCategories}
          />
        </div>
      )}

      <div className="w-full">
        {type === "GRID" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >

            {/* Projects grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
              {loading && (
                <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center z-10">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              )}
              
              {projects.length > 0 ? (
                projects.map((item, index) => (
                  <ProjectItem key={`${item.name}-${index}`} item={item} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">
                    Không tìm thấy dự án nào phù hợp với bộ lọc của bạn.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination
                  currentPage={meta.page}
                  totalPages={meta.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </motion.div>
        )}

        {type === "CAROUSEL" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Carousel3D items={projects} autoPlay={true} interval={4000} />
          </motion.div>
        )}

        {type === "GLOBE" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Carousel3DGlobe
              items={projects}
              autoPlay={true}
              interval={4000}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

const ProjectItem = ({ item }: { item: IProject }) => {
  return (
    <div className="flex flex-col gap-5 border rounded-lg p-5 hover:shadow-lg transition-shadow">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-2 items-center">
          <div className="size-[40px] min-w-[40px] rounded-full bg-primary"></div>
          <div className="flex flex-col ">
            <p className="text-lg font-bold capitalize">{item.name}</p>
            <span className="text-xs font-thin ">Tiên Phong CDS</span>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-600 dark:text-gray-300">
        {item.description}
      </div>
      
      <div className="rounded-lg overflow-hidden shadow-sm">
        <Image
          src={item.image}
          alt={item.name}
          width={500}
          height={400}
          className="w-full object-cover rounded-lg h-[400px] object-top hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Technology tags */}
      <div className="flex flex-wrap gap-1">
        {item.category.slice(0, 4).map((tech, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
          >
            {tech}
          </span>
        ))}
        {item.category.length > 4 && (
          <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md">
            +{item.category.length - 4}
          </span>
        )}
      </div>
    </div>
  );
};
