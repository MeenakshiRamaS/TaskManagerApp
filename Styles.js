import { StyleSheet } from "react-native";

// used a separate style sheet to keep the styles a little more readable!

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
  // change style of completed tasks to havea strikethrough
  completedTextName: {
    textDecorationLine: "line-through",
    color: "#1E1E24",
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

  // general container for task name and time
  taskTextContainer: {
    flex: 1,
    flexDirection: "column",
    fontFamily: "Quicksand-Light",
    color: "#1E1E24",
  },

  // styling for completed tasks slightly different
  // with strikethrough and different color
  completedTextName: {
    fontSize: 16,
    color: "gray",
    textDecorationLine: "line-through",
  },

  completedTextTime: {
    fontSize: 12,
    color: "gray",
    textDecorationLine: "line-through",
  },
});

export default styles;
