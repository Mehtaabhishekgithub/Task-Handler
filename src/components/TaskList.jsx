import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { tasks, reorderTasks, filter } = useTasks();

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;

    const items = Array.from(tasks);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    reorderTasks(items);
  };

  if (tasks.length === 0) {
    const emptyMessages = {
      all: { icon: "📋", text: "No tasks yet — add one above!" },
      completed: { icon: "✅", text: "No completed tasks yet." },
      pending: { icon: "🎉", text: "All tasks are done!" },
    };
    const msg = emptyMessages[filter] || emptyMessages.all;

    return (
      <div className="empty-state">
        <div className="empty-state-icon">{msg.icon}</div>
        <p>{msg.text}</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="task-list-container"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <TaskItem
                    task={task}
                    provided={provided}
                    snapshot={snapshot}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
