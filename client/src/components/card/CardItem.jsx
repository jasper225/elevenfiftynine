import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function CardItem({ id, title }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: "8px",
        marginBottom: "8px",
        backgroundColor: "white",
        borderRadius: "4px",
        cursor : "grab"
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {title}
        </div>
    );
}   