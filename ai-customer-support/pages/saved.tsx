
import React from 'react';
import prisma from '../lib/prisma';

const SavedChats: React.FC<{ favorites: { content: string }[] }> = ({ favorites }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Saved Chats</h1>
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index} className="p-2 border-b">
            {favorite.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const favorites = await prisma.favorite.findMany();
  return {
    props: { favorites }
  };
}

export default SavedChats;