import React, { useState } from "react";

const categories = [
  { id: 1, name: "IT" },
  { id: 2, name: "Agriculture" },
  { id: 3, name: "Education" },
  { id: 4, name: "Health" },
  { id: 5, name: "Finance" },
  { id: 6, name: "Marketing" },
  { id: 7, name: "Engineering" },
];

const CategorySection = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8">
      {/* Left Section */}
      <div className="flex-1 text-center md:text-left border-r md:border-r-2 border-gray-300 pr-4">
        <h3 className="text-2xl font-semibold mb-4">Categories</h3>
        <p className="text-gray-600">Select a category to explore more.</p>
      </div>

      {/* Right Section */}
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-4 border border-gray-300 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer text-center"
            onClick={() => setExpandedCategory(category.id)}
          >
            <span className="text-lg font-medium">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
