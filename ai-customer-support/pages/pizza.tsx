import React from 'react';
import PizzaCard from '../components/PizzaCard';

const pizzas = [
  {
    name: "Margherita",
    description: "Classic pizza with fresh tomatoes, mozzarella, and basil.",
    image: "/images/margherita.jpg"
  },
  {
    name: "Pepperoni",
    description: "Popular pizza topped with pepperoni slices and cheese.",
    image: "/images/pepperoni.jpg"
  },
  {
    name: "Vegetarian",
    description: "A healthy choice with a variety of fresh vegetables.",
    image: "/images/vegetarian.jpg"
  }
];

const Pizza: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Explore Our Delicious Pizzas</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pizzas.map((pizza, index) => (
          <PizzaCard 
            key={index}
            name={pizza.name}
            description={pizza.description}
            image={pizza.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Pizza;
