# 🧩 FigJam ERD Plugin

Easily create interactive **Entity Relationship Diagrams (ERDs)** in [FigJam](https://www.figma.com/figjam/) with this plugin. Just paste your database schema written in **MySQL**, **PostgreSQL**, or **DBML**, and the plugin will parse it into an editable diagram with tables and relationships.

![Demo Screenshot](images/diagram_ecommerce.png)

Watch this video on [How to Use the Plugin](https://www.linkedin.com/posts/laura-galera-9a388016a_data-dataengineering-databases-activity-7323724148906573824-xEEV?utm_source=share&utm_medium=member_desktop&rcm=ACoAAChaDYsBmjhNzuQ1p6V1qPK2Lkn9pz2N5tw) for a quick guide.

## ✨ Features

- 📝 **Built-in Code Editor** with live preview and syntax highlighting
- 🔍 **Real-Time Error Detection** for supported SQL dialects
- 📊 **Auto-Generated Diagrams** from MySQL, PostgreSQL, and DBML
- 🧱 **Visual Elements**:
  - Primary/Foreign key icons
  - Color-coded fields by type
- 🖱️ **Fully Interactive**:
  - Drag and rearrange tables
  - Adjust connectors freely
  - Editable text labels

## 🚀 Getting Started

1. Open **FigJam**
2. Search for `Entity Relationship Diagram` in the Plugins menu.
3. Paste your schema code into the editor
4. Watch as your database is transformed into an editable diagram!

## 🧪 Supported Syntax

- MySQL
- PostgreSQL
- [DBML](https://www.dbml.org/)

Example DBML:
```dbml
Table users {
  id int [pk]
  name varchar
  email varchar
}

Table posts {
  id int [pk]
  user_id int [ref: > users.id]
  title varchar
}
```
