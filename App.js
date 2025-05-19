import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import { useState, useRef } from "react";

export default function App() {
  // Always call hooks at the top, no early returns before hooks
  const [fontsLoaded] = useFonts({
    "Quicksand-Bold": require("./assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Light": require("./assets/fonts/Quicksand-Medium.ttf"),
  });

  // State declarations
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("");
  const [tasksList, setTasksList] = useState([]);
  const taskCounter = useRef(0); // useRef for mutable task ID counter
  const [error, setError] = useState("");

  if (!fontsLoaded) {
    return null; // Render nothing until fonts are loaded
  }

  // Filtering tasks
  const completeTasks = tasksList.filter((t) => t.complete);
  const incompleteTasks = tasksList.filter((t) => !t.complete);

  // Percentage of completed tasks (handle divide by zero)
  const totalTasks = completeTasks.length + incompleteTasks.length;
  const completePercent =
    totalTasks === 0 ? 0 : (completeTasks.length / totalTasks) * 100;

  const handleAddTask = () => {
    if (newTaskName.trim().length === 0) {
      setError("Input cannot be empty.");
      return;
    }
    setError("");
    taskCounter.current += 1; // Increment the ref counter

    const newTask = {
      id: taskCounter.current,
      name: newTaskName,
      time: newTaskTime,
      complete: false,
    };

    setTasksList([...tasksList, newTask]);

    // Reset inputs after adding task
    setNewTaskName("");
    setNewTaskTime("");
  };

  const toggleComplete = (id) => {
    setTasksList(
      tasksList.map((task) =>
        task.id === id ? { ...task, complete: !task.complete } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasksList(tasksList.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task name"
        value={newTaskName}
        onChangeText={setNewTaskName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter time required (hours)"
        keyboardType="numeric"
        value={newTaskTime}
        onChangeText={setNewTaskTime}
      />

      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

      <TouchableOpacity
        onPress={handleAddTask}
        style={{
          backgroundColor: "#1E1E24",
          padding: 10,
          borderRadius: 5,
          marginTop: 7,
        }}
      >
        <Text style={{ color: "#FFF8F0", textAlign: "center" }}>Add</Text>
      </TouchableOpacity>

      {/* List of Incomplete Tasks */}
      <Text style={styles.subSectionICandC}>Incomplete Tasks</Text>
      {incompleteTasks.map((task) => (
        <View key={task.id} style={styles.taskItem}>
          <TouchableOpacity
            onPress={() => toggleComplete(task.id)}
            style={styles.gencheckbox}
          >
            <View style={styles.uncheckedBox} />
          </TouchableOpacity>
          <View style={styles.taskTextContainer}>
            <Text style={styles.taskName}>{task.name}</Text>
            <Text style={styles.taskTime}>{task.time} hours</Text>
          </View>
          <Button
            title="X"
            color="#92140C"
            onPress={() => deleteTask(task.id)}
          />
        </View>
      ))}

      {/* List of Completed Tasks */}
      <Text style={styles.subSectionICandC}>Completed Tasks</Text>
      {completeTasks.map((task) => (
        <View key={task.id} style={[styles.taskItem, styles.completedTask]}>
          <TouchableOpacity
            onPress={() => toggleComplete(task.id)}
            style={styles.gencheckbox}
          >
            <View style={styles.checkedBox}>
              <Text style={{ color: "#FFF8F0" }}>✓</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.taskTextContainer}>
            <Text style={styles.completedTextName}>{task.name}</Text>
            <Text style={styles.completedTextTime}>{task.time} hours</Text>
          </View>
          <Button
            title="X"
            color="#92140C"
            onPress={() => deleteTask(task.id)}
          />
        </View>
      ))}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  // general
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
    backgroundColor: "#FFF8F0",
  },
  // Task Manager title styling
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Quicksand-Bold",
    color: "#92140C",
    borderColor: "#1E1E24",
  },
  // input fields styling
  input: {
    borderWidth: 1,
    borderColor: "#1E1E24",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#1E1E24",
    fontFamily: "Quicksand-Light",
  },

  // title of subsections for complete and incomplete tasks
  subSectionICandC: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: "600",
    fontFamily: "Quicksand-Bold",
    marginTop: 40,
  },

  // displaying of each task item
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#1E1E24",
    fontFamily: "Quicksand-Light",
  },
  // change style of completed tasks to have a strikethrough
  completedTextName: {
    textDecorationLine: "line-through",
    color: "#1E1E24",
  },
  taskButtons: {
    flexDirection: "row",
    gap: 5,
  },
  gencheckbox: {
    width: 20,
    height: 20,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  uncheckedBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#92140C",
    borderRadius: 3,
  },

  checkedBox: {
    width: 20,
    height: 20,
    backgroundColor: "#92140C",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  taskTextContainer: {
    flex: 1,
    flexDirection: "column",
    fontFamily: "Quicksand-Light",
    color: "#1E1E24",
  },

  taskName: {
    fontSize: 16,

    color: "#1E1E24",
  },
  taskTime: {
    fontSize: 12,
  },

  completedTextName: {
    fontSize: 16,
  },

  completedTextTime: {
    fontSize: 12,
    textDecorationLine: "line-through",
    color: "#1E1E24",
  },
});
