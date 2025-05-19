import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useState, useRef } from "react";
import * as Progress from "react-native-progress";
import { ScrollView, Keyboard } from "react-native";
import styles from "./Styles";
// import Components

export default function App() {
  // Always call hooks at the top, no early returns before hooks
  const [fontsLoaded] = useFonts({
    "Quicksand-Bold": require("./assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Light": require("./assets/fonts/Quicksand-Medium.ttf"),
  });

  // State declarations
  const [newTaskName, setNewTaskName] = useState("");   //state for Task Name
  const [newTaskDesc, setNewTaskDesc] = useState("");   //state for Task Description
  const [newTaskDate, setNewTaskDate] = useState("");   //state for Task Date
  const [newTaskTime, setNewTaskTime] = useState("");   //state for Task Time
  const [tasksList, setTasksList] = useState([]);       //state for list of Tasks
  const taskCounter = useRef(0);                        // useRef to create a unique ID for each task
  const [error, setError] = useState("");               // error for invalid user input

  if (!fontsLoaded) {
    return null; // check edge case just in case
  }

  // use a filter to create 2 new arrays or lists of complete and incomplete tasks
  const completeTasks = tasksList.filter((t) => t.complete);
  const incompleteTasks = tasksList.filter((t) => !t.complete);

  // Percentage of completed tasks (handle divide by zero)
  const totalTasks = completeTasks.length + incompleteTasks.length;
  const completePercent =
    totalTasks === 0 ? 0 : (completeTasks.length / totalTasks) * 100;

  /*  Event Handler: adding a new task
      Function Description: uses useStates for task name and time to create a new task object.
      New task is added to taskList which enters task into Incomplete Section.
      User input is reset after task has been successfully added.
  */
  const handleAddTask = () => {
    // edge cases for invalid input and error handling
    if (newTaskName.trim().length === 0 || newTaskTime.trim().length === 0) {
      setError("Invalid Input");
      return;
    }
    // no error
    setError("");
    taskCounter.current += 1; // counter for unique ID for this new task

    // create a new task object based on user input
    const newTask = {
      id: taskCounter.current,
      name: newTaskName,
      time: newTaskTime,
      complete: false,
    };

    // add new task to tasksList
    setTasksList([...tasksList, newTask]);

    // after task has been successfully added reset the user input for task name and hours
    setNewTaskName("");
    setNewTaskTime("");
    Keyboard.dismiss(); // incase react-native doesn't automtically dismiss the keyboard
  };

  /*  Event Handler: setting complete/incomplete tasks to opposite boolean value
      Function Description: uses a task's ID to find task in the tasksList and set
      the corresponding task object's complete field (boolean) to the opposite value
  */
  const toggleComplete = (id) => {
    setTasksList(
      // map through tasksList until task with corresponding ID is found
      tasksList.map((task) =>
        // set a new value to complete
        task.id === id ? { ...task, complete: !task.complete } : task,
      ),
    );
  };

  /*  Event Handler: deleting a task
      Function Description: uses a task's ID to find task in the tasksList and
      render a new tasksList without the corresponding task object from the original tasksList
  */
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

      {error ? <Text style={{ color: "#92140C" }}>{error}</Text> : null}

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

      {/* Progress Bar (differs based on tasks length and whathas been completed) */}
      <View style={{ alignItems: "center", marginTop: 16 }}>
        {incompleteTasks.length === 0 && completeTasks.length === 0 ? (
          <Text
            style={{
              fontSize: 16,
              color: "#1E1E24",
              fontFamily: "Quicksand-Light",
            }}
          >
            Nothing to do today!
          </Text>
        ) : incompleteTasks.length === 0 && completeTasks.length > 0 ? (
          <View
            style={{
              flexDirection: "col",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <Progress.Bar
              progress={completePercent / 100}
              width={200}
              height={10}
              color="#92140C"
              unfilledColor="#DDD"
              backgroundColor="#FFF8F0"
              borderRadius={5}
              style={{ marginTop: 8 }}
            />
            <Text
              style={{
                fontSize: 16,
                color: "#1E1E24",
                fontFamily: "Quicksand-Light",
              }}
            >
              All tasks are completed!
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 16,
              fontFamily: "Quicksand-Light",
            }}
          >
            <Progress.Bar
              progress={completePercent / 100}
              width={200}
              height={10}
              color="#92140C"
              backgroundColor="#FFF8F0"
              borderRadius={5}
              style={{ marginTop: 8 }}
            />
            <Text
              style={{
                fontSize: 16,
                color: "#1E1E24",
                fontFamily: "Quicksand-Light",
              }}
            >
              {Math.floor(completePercent)}% of your way there!
            </Text>
          </View>
        )}
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, indicatorStyle: "black" }}
      >
        {/* List of Incomplete Tasks (used map) */}
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
        {/* List of Completed Tasks (used map) */}
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
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
