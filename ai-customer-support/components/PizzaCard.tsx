import React from 'react';

type PizzaCardProps = {
  name: string;
  description: string;
  image: string;
};

const PizzaCard: React.FC<PizzaCardProps> = ({ name, description, image }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PizzaCard;
