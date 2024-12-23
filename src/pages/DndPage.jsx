// src/pages/DndPage.jsx
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from 'react-router-dom';

import '../styles/pages/DndPage.css'

function DndPage() {
  const [columns, setColumns] = useState({
    todo: {
      name: "To Do",
      items: [
        { id: "1", content: "First task" },
        { id: "2", content: "Second task" },
      ],
    },
    blocked: {
      name: "Blocked",
      items: [],
    },
    inProgress: {
      name: "In Progress",
      items: [],
    },
    done: {
      name: "Done",
      items: [],
    },
  });


  const onDragEnd = (result, columns, setColumns) => {
    const { source, destination } = result;
    if (!destination) return;
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
      });
    } else {
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
  };

  const removeTodo = (id) => {
    const updatedColumns = { ...columns };
  
    for (const columnId in updatedColumns) {
      const column = updatedColumns[columnId];
      const filteredItems = column.items.filter(item => item.id !== id);
  
      if (filteredItems.length < column.items.length) {
        updatedColumns[columnId].items = filteredItems;
      }
    }
  
    setColumns(updatedColumns);
  };

  return (
    <div>
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "0 5px",
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "lightblue"
                          : "lightgrey",
                        padding: 4,
                        width: 300,
                        minHeight: 500,
                      }}
                    >
                      {column.items.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id }
                          index={index}
                        >
                          {(provided, snapshot) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: "none",
                                  padding: 16,
                                  margin: "0 0 8px 0",
                                  minHeight: "50px",
                                  backgroundColor: snapshot.isDragging
                                    ? "#263B4A"
                                    : "#456C86",
                                  color: "white",
                                  ...provided.draggableProps.style,
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "8px"
                                }}
                              >
                                {/* Текст задачи */}
                                { item.content }

                                {/* кнопка удаления задачи */}
                                <button
                                  className="deleteButton"
                                  onClick={()=>removeTodo(item.id)}
                                >Delete task </button>
                              </div>
                            );
                          }}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
      <Link to="/" >To list</Link>
    </div>
  );
}
export default DndPage;
