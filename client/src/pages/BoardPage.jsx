import React from 'react';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';
import CardItem from '../components/card/CardItem';

export default function BoardPage() { 
    const [lists, setLists] = React.useState([
        { id: 'list-1', title: 'Due', cards: ['Assignment 1', 'Assignment 2'] },
        { id: 'list-2', title: 'Submitted', cards: ['Assignment 3', 'Assignment 4'] },
    ]);
    
 function handleDragEnd(event) {
  const { active, over } = event;
  if (!over || active.id === over.id) return;

  const sourceList = lists.find((list) => list.cards.includes(active.id));
  
  // check if dropping onto a list directly, or onto a card
  let destList = lists.find((list) => list.cards.includes(over.id));
  if (!destList) destList = lists.find((list) => list.id === over.id);

  if (!sourceList || !destList) return;

  if (sourceList.id === destList.id) {
    const oldIndex = sourceList.cards.indexOf(active.id);
    const newIndex = sourceList.cards.indexOf(over.id);
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === sourceList.id
          ? { ...list, cards: arrayMove(list.cards, oldIndex, newIndex) }
          : list
      )
    );
  } else {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === sourceList.id)
          return { ...list, cards: list.cards.filter((c) => c !== active.id) };
        if (list.id === destList.id)
          return { ...list, cards: [...list.cards, active.id] };
        return list;
      })
    );
  }
}

    
    return (
        <DndContext onDragEnd={handleDragEnd}>
        <div className="board-page">
        <h1>Board Page</h1>
        <div style={{ display: "flex", gap: "16px" }}>

        {lists.map((list) => (
          <div key={list.id} style={{ background: "#e2e8f0", padding: "12px", borderRadius: "8px", width: "250px" }}>
            <h2>{list.title}</h2>
            <SortableContext items={list.cards} strategy={verticalListSortingStrategy}>
              {list.cards.map((card) => (
                <CardItem key={card} id={card} title={card} />
              ))}
            </SortableContext>
          </div>
        ))}

            </div>
        </div>
    </DndContext>
);

}
