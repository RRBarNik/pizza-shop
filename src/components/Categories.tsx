import React, { useState } from "react";

export type PropsType = {
  value: number;
  onChangeCategory: (categoryId: number) => void
}

const Categories: React.FC<PropsType> = ({ value, onChangeCategory, ...props }) => {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
  ];

  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoryName, i) => (
            <li
              key={i}
              onClick={() => onChangeCategory(i)}
              className={value === i ? 'active' : ''}>
              {categoryName}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Categories;