import React, { useState } from "react";

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Item 1", category: "Category A", quantity: 15 },
    { id: 2, name: "Item 2", category: "Category B", quantity: 8 },
  ]);
  const [filterCategory, setFilterCategory] = useState("");
  const [sortByQuantity, setSortByQuantity] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", category: "", quantity: "" });

  const addItem = () => {
    if (!newItem.name || !newItem.category || !newItem.quantity) return;
    const newEntry = {
      id: inventory.length + 1,
      name: newItem.name,
      category: newItem.category,
      quantity: parseInt(newItem.quantity),
    };
    setInventory([...inventory, newEntry]);
    setNewItem({ name: "", category: "", quantity: "" });
  };

  const editItem = (id, updatedItem) => {
    setInventory(
      inventory.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const deleteItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const filteredInventory = inventory
    .filter((item) =>
      filterCategory ? item.category === filterCategory : true
    )
    .sort((a, b) => (sortByQuantity ? a.quantity - b.quantity : 0));

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Inventory Management</h1>

      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) =>
            setNewItem({ ...newItem, category: e.target.value })
          }
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) =>
            setNewItem({ ...newItem, quantity: e.target.value })
          }
          style={styles.input}
        />
        <button onClick={addItem} style={styles.addButton}>Add Item</button>
      </div>

      <div style={styles.filters}>
        <label style={styles.label}>
          Filter by Category:
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={styles.select}
          >
            <option value="">All</option>
            {[...new Set(inventory.map((item) => item.category))].map(
              (category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              )
            )}
          </select>
        </label>
        <button
          onClick={() => setSortByQuantity(!sortByQuantity)}
          style={styles.sortButton}
        >
          Sort by Quantity
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item) => (
            <tr
              key={item.id}
              style={item.quantity < 10 ? styles.lowStock : styles.row}
            >
              <td style={styles.td}>{item.name}</td>
              <td style={styles.td}>{item.category}</td>
              <td style={styles.td}>{item.quantity}</td>
              <td style={styles.td}>
                <button
                  onClick={() =>
                    editItem(item.id, {
                      name: prompt("Enter new name:", item.name) || item.name,
                      category:
                        prompt("Enter new category:", item.category) ||
                        item.category,
                      quantity:
                        parseInt(
                          prompt("Enter new quantity:", item.quantity) ||
                            item.quantity
                        ),
                    })
                  }
                  style={styles.editButton}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "20px auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
    fontSize: "1.8rem",
  },
  controls: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
    justifyContent: "center",
  },
  input: {
    flex: "1",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  filters: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  label: {
    fontSize: "1rem",
    color: "#555",
  },
  select: {
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  sortButton: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "6px",
    overflow: "hidden",
  },
  th: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "12px",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  },
  row: {
    backgroundColor: "#fff",
  },
  lowStock: {
    backgroundColor: "#ffe5e5",
  },
  editButton: {
    padding: "6px 12px",
    backgroundColor: "#ffc107",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "8px",
  },
  deleteButton: {
    padding: "6px 12px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default InventoryManagement;