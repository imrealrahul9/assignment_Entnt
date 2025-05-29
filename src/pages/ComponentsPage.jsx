import { useComponents } from "../contexts/ComponentsContext";
import { useState } from "react";
import ComponentForm from "../components/Components/ComponentForm";
import ComponentList from "../components/Components/ComponentList";

export default function ComponentsPage() {
  const { components, addComponent, updateComponent, deleteComponent } = useComponents();
  const [editingComponent, setEditingComponent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setEditingComponent(null);
    setShowForm(true);
  };

  const handleEdit = (component) => {
    setEditingComponent(component);
    setShowForm(true);
  };

  const handleFormSubmit = (componentData) => {
    if (editingComponent) {
      updateComponent(componentData);
    } else {
      addComponent({ ...componentData, id: `c${Date.now()}` });
    }
    setShowForm(false);
  };

  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-white font-bold">Components Management</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          + Add Component
        </button>
      </div>
      {showForm && (
        <ComponentForm
          component={editingComponent}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
      <ComponentList components={components} onEdit={handleEdit} onDelete={deleteComponent} />
    </div>
  );
}
